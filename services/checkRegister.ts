export default function checkRegister(
  name: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (
    name.length === 0 ||
    email.length === 0 ||
    phone.length === 0 ||
    password.length === 0 ||
    confirmPassword.length === 0
  ) {
    console.log("thieu thong tin");
      return 1;
  } else {
    if (!filter.test(email)){
      console.log("email invalid");
        return 1;
    } 
    else {
      if (phone.length !== 10) {
        console.log("number == 10");
        return 1;
      }
      else {
        if (password !== confirmPassword){
          console.log("password doesn't match");
          return 1;
        } 
      }
    }
  }
  return 0;
}
