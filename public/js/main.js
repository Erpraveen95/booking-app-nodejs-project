const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const number = document.querySelector('#Phone');
const msg = document.querySelector('.msg');
const userList = document.getElementById('users');


// Listen for form submit
myForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();
  if(nameInput.value === '' || emailInput.value === '' || number.value === '') {
    // alert('Please enter all fields');
    msg.classList.add('error');
    msg.innerHTML = 'Please enter all fields';

    // Remove error after 3 seconds
    setTimeout(() => msg.remove(), 3000);
  } else {
    const userDetails = {
      name :nameInput.value,
      email: emailInput.value,
      phone :number.value
    }
   //console.log(userDetails)
    //showNewUserOnScreen(userDetails)

    try {
          const dataFromBack = await axios.post('http://localhost:3000/add-user',userDetails)
          //console.log('data succesfully loaded',dataFromBack.data)
          //console.log(dataFromBack)
         showNewUserOnScreen(dataFromBack.data.newUserDetails)
        nameInput.value = ""
        emailInput.value = ""
        number.value = ""
    }
    catch(err) {
      console.log(err,"error in line 37")
    }
}
}
//event listner to show already present data to screen
   window.addEventListener("DOMContentLoaded",()=>{
     axios.get('http://localhost:3000/')
     .then(res=>{
       for (let i = 0; i < res.data.allUsers.length;i++){
         showNewUserOnScreen((res.data.allUsers)[i])
        }
     })
     .catch(err=>console.error(err))
     }) 
//showdata on screen 

function showNewUserOnScreen(user){
 // console.log(user)
      const parentNode = userList
      const childHTML = `<li id=${user.id}>${user.name} - ${user.email} - ${user.phone} 
                          <button onclick=deleteUser('${user.id}')>Delete</button>
                          <button onclick=editDetails('${user.name}','${user.email}','${user.phone}','${user.id}')>Edit</button></li>`
       parentNode.innerHTML = parentNode.innerHTML + childHTML
    }

//delete functionality
function deleteUser(id){
  axios.delete(`http://localhost:3000/delete-user/${id}`)
      .then(console.log('delete success'))
      .catch(err=>console.log(err))
       removeUserFromScreen(id)
  } 
//
  function removeUserFromScreen(id){
    const parentNode = userList
    const childNodeToBeDeleted = document.getElementById(id);
    parentNode.removeChild(childNodeToBeDeleted)
  }

function editDetails(name,email,phone,id){
  document.getElementById('name').value=name;
  document.getElementById('email').value=email;
  document.getElementById('Phone').value=phone;
  deleteUser(id)
} 