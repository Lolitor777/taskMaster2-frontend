let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
let regexPassword = /^.{6,15}$/;
let regexDescription = /^.{5,250}$/;

const today = new Date();

const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDay = today.getDate();



export const validationsFormSignUp = (form) => {
  let errors = {};

  if (!form.name.trim()) {
    delete errors.submit;
    errors.name = "El campo 'Nombre' es requerido";
  } 
  else if (!regexName.test(form.name.trim())) {
    errors.name = "El campo 'Nombre' solo acepta letras y espacios en blanco";
  }

  if (!form.email.trim()) {
    delete errors.submit;
    errors.email = "El campo 'Correo electrónico' es requerido";
  } 
  else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Correo electrónico' es incorrecto";
  }

  if (!form.password.trim()) {
    delete errors.submit;
    errors.password = "El campo 'Contraseña' es requerido";
  } 
  else if (!regexPassword.test(form.password.trim())) {
    errors.password = "El campo 'Contraseña' debe tener mínimo 6 carácteres";
  }

  return errors;
};


export const validationsFormLogin = (form) => {

  let errors = {};

  if (!form.email.trim()) {
    delete errors.submit;
    errors.email = "El campo 'Correo electrónico' es requerido";
  } 
  else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El campo 'Correo electrónico' es incorrecto";
  }

  if (!form.password.trim()) {
    delete errors.submit;
    errors.password = "El campo 'Contraseña' es requerido";
  } 
  else if (!regexPassword.test(form.password.trim())) {
    errors.password = "El campo 'Contraseña' debe tener mínimo 6 carácteres";
  }

  return errors;
}

export const validateFormTask = (form) => {
  let errors = {};

  if (!form.description.trim()) {
    delete errors.submit;
    errors.description = "El campo 'Descripción' es requerido";
  } 
  else if (!regexDescription.test(form.description.trim())) {
    errors.description = "El campo 'Descripción' debe tener mínimo 5 carácteres";
  }

  if (!form.due_date.trim()) {
    delete errors.submit;
    errors.due_date = "El campo 'Fecha de vencimiento' es requerido";
  }

  const date_user = new Date(form.due_date) 
  

  const date_userYear = date_user.getFullYear();
  const date_userMonth = date_user.getMonth();
  const date_userDay = date_user.getDate();

  if (date_userYear < todayYear || 
    (date_userYear === todayYear && (date_userMonth < todayMonth || 
    (date_userMonth === todayMonth && (date_userDay + 1) < todayDay)))) {
    delete errors.submit;
    errors.due_date = "La fecha es anterior a la actual";
  }else {
    delete errors.due_date;
  }

  return errors;
}

export const validatePassword = (form) => {

  let errors = {};

  if (!form.password.trim()) {
    delete errors.submit;
    errors.password = "El campo 'Contraseña' es requerido";
  } 
  else if (!regexPassword.test(form.password.trim())) {
    errors.password = "El campo 'Contraseña' debe tener mínimo 6 carácteres";
  }

  return errors;
}

export const validateEmail = (form) => {
  let errors = {};

  if (!form.email.trim()) {
    delete errors.submit;
    errors.email = "El campo 'Correo electrónico' es requerido";
  } 
  else if (!regexEmail.test(form.email.trim())) {
    delete errors.submit;
    errors.email = "El campo 'Correo electrónico' es incorrecto";
  }

  return errors;
}

