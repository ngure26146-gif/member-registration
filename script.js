const form = document.getElementById('regform');

// Inputs
const inputs = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  confirmPassword: document.getElementById('confirm-password'),
  gender: document.getElementById('gender'),
  dob: document.getElementById('dob'),
  country: document.getElementById('country'),
  phone: document.getElementById('phone'),
  bio: document.getElementById('bio')
};

// Error elements
const errors = {
  name: document.getElementById('nameError'),
  email: document.getElementById('emailError'),
  password: document.getElementById('passwordError'),
  confirm: document.getElementById('confirmError'),
  gender: document.getElementById('genderError'),
  dob: document.getElementById('dobError'),
  country: document.getElementById('countryError'),
  phone: document.getElementById('phoneError'),
  bio: document.getElementById('bioError')
};

// Other elements
const successMsg = document.getElementById('successMsg');
const memberList = document.getElementById('memberList');
const memberCount = document.getElementById('count');
const emptyNote = document.getElementById('emptyNote');
const darkModeBtn = document.getElementById('theme');


console.log('✅ Form:', form);
console.log('✅ Inputs:', inputs);
console.log('✅ Error fields:', errors);
console.log('✅ Success message:', successMsg);
console.log('✅ Member list:', memberList);
console.log('✅ Counter:', memberCount);
console.log('✅ Dark Mode button:', darkModeBtn);



function showError(inputEl, errorEl, message) {
  errorEl.textContent = message;
  inputEl.classList.add('invalid');
}

function clearError(inputEl, errorEl) {
  errorEl.textContent = '';
  inputEl.classList.remove('invalid');
}




inputs.name.addEventListener('input', () => clearError(inputs.name, errors.name));
inputs.email.addEventListener('input', () => clearError(inputs.email, errors.email));
inputs.password.addEventListener('input', () => clearError(inputs.password, errors.password));
inputs.confirmPassword.addEventListener('input', () => clearError(inputs.confirmPassword, errors.confirm));
inputs.gender.addEventListener('change', () => clearError(inputs.gender, errors.gender));
inputs.dob.addEventListener('input', () => clearError(inputs.dob, errors.dob));
inputs.country.addEventListener('input', () => clearError(inputs.country, errors.country));
inputs.phone.addEventListener('input', () => clearError(inputs.phone, errors.phone));
inputs.bio.addEventListener('input', () => clearError(inputs.bio, errors.bio));




form.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  // Name 
  if (!inputs.name.value.trim()) {
    showError(inputs.name, errors.name, 'Full name is required.');
    isValid = false;
  } else clearError(inputs.name, errors.name);

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!inputs.email.value.trim()) {
    showError(inputs.email, errors.email, 'Email is required.');
    isValid = false;
  } else if (!emailRegex.test(inputs.email.value)) {
    showError(inputs.email, errors.email, 'Enter a valid email address.');
    isValid = false;
  } else clearError(inputs.email, errors.email);

  // Password 
  if (!inputs.password.value) {
    showError(inputs.password, errors.password, 'Password is required.');
    isValid = false;
  } else if (inputs.password.value.length < 6) {
    showError(inputs.password, errors.password, 'Password must be at least 6 characters.');
    isValid = false;
  } else clearError(inputs.password, errors.password);

  // Confirm Password
  if (!inputs.confirmPassword.value) {
    showError(inputs.confirmPassword, errors.confirm, 'Please confirm your password.');
    isValid = false;
  } else if (inputs.confirmPassword.value !== inputs.password.value) {
    showError(inputs.confirmPassword, errors.confirm, 'Passwords do not match.');
    isValid = false;
  } else clearError(inputs.confirmPassword, errors.confirm);

  // Gender 
  if (!inputs.gender.value) {
    showError(inputs.gender, errors.gender, 'Please select your gender.');
    isValid = false;
  } else clearError(inputs.gender, errors.gender);

  //  Date of Birth 
  if (!inputs.dob.value) {
    showError(inputs.dob, errors.dob, 'Date of birth is required.');
    isValid = false;
  } else clearError(inputs.dob, errors.dob);

  //  Country 
  if (!inputs.country.value.trim()) {
    showError(inputs.country, errors.country, 'Country is required.');
    isValid = false;
  } else clearError(inputs.country, errors.country);

  // Phone 
  const phoneRegex = /^[+\d][\d\s\-+]{9,14}$/;
  if (!inputs.phone.value.trim()) {
    showError(inputs.phone, errors.phone, 'Phone number is required.');
    isValid = false;
  } else if (!phoneRegex.test(inputs.phone.value)) {
    showError(inputs.phone, errors.phone, 'Enter a valid phone number.');
    isValid = false;
  } else clearError(inputs.phone, errors.phone);

  // Bio 
  if (!inputs.bio.value.trim()) {
    showError(inputs.bio, errors.bio, 'Please write a short bio.');
    isValid = false;
  } else clearError(inputs.bio, errors.bio);

  
  if (!isValid) return;

  
  if (emptyNote) emptyNote.remove();

  const newMember = document.createElement('li');
  newMember.className = 'member-item';
  newMember.innerHTML = `
    <div class="info">
      <strong>${inputs.name.value}</strong>
      <span>${inputs.email.value} • ${inputs.country}</span>
    </div>
    <button class="remove">Remove</button>
  `;


  newMember.querySelector('.remove').addEventListener('click', function () {
    newMember.remove();
    updateCounter();
    
    if (memberList.children.length === 0) {
      memberList.innerHTML = '<li class="empty" id="emptyNote">No members yet. Register someone to begin.</li>';
    }
  });


  memberList.appendChild(newMember);


  updateCounter();


  successMsg.textContent = 'Registration successful!';
  successMsg.classList.remove('hidden');
  form.reset();


  setTimeout(() => {
    successMsg.classList.add('hidden');
  }, 3000);
});


function updateCounter() {
  const total = memberList.querySelectorAll('.member-item').length;
  memberCount.textContent = total;
}


// Dark Mode Toggle

darkModeBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark'); 
  

  const isDark = document.body.classList.contains('dark');
  darkModeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  

  localStorage.setItem('darkMode', isDark);
});


if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark');
  darkModeBtn.textContent = 'Light Mode';
}
