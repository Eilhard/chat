<template lang="html">
  <div class="login">
    <form v-on:submit.prevent class="login-form z-depth-1">
     <div class="tabs-menu mb--2">
       <button
         v-for="tab in tabs"
         v-bind:key="`login-tab_${tab.title}`"
         v-on:click="tab.action(tab)"
         class="tabs-menu__tab"
         v-bind:class="{ 'tabs-menu__tab--active': tab.isPressed }"
       >
         {{tab.title}}
       </button>
     </div>

     <div
       v-show="status.isShown"
       class="login-status"
       v-bind:class="{
         'login-status--success': (status.type == 'success') ? true : false,
         'login-status--error': (status.type == 'error') ? true : false
       }"
     >{{status.message}}</div>

     <div
       v-for="item in inputs"
       v-show="item.isShown"
       class="input-field my--2"

     >
       <input
         class="input-group__text-input"
         :type="item.type"
         :id="item.id"
         v-model="item.state"
       >
       <label :for="item.id">{{item.title}}</label>
     </div>

     <button
       v-for="btn in submit"
       v-show="btn.isShown"
       v-on:click="btn.action"
       class="waves-effect waves-light btn my--1 "
     >
       {{btn.title}}
     </button>
   </form>
  </div>
</template>

<script>
  export default {
    data() {
     return {
       mode: 'login',
       tabs: [
         {
           model: 'login',
           title: "Вход",
           isPressed: true,
           action: this.switchTabs
         },
         {
           model: 'register',
           title: "Регистрация",
           isPressed: false,
           action: this.switchTabs
         }
       ],
       inputs: [
         {
           model: 'register',
           id: 'firstname',
           title: "Имя",
           type: "text",
           isShown: false,
           state: ''
         },
         {
           model: 'register',
           id: 'lastname',
           title: "Фамилия",
           type: "text",
           isShown: false,
           state: ''
         },
         {
           model: 'register',
           id: 'email',
           title: "Email",
           type: "email",
           isShown: false,
           state: ''
         },
         {
           model: 'all',
           id: 'login',
           title: "Логин",
           type: "text",
           isShown: true,
           state: ""
         },
         {
           model: 'all',
           id: 'password',
           title: "Пароль",
           type: "password",
           isShown: true,
           state: ""
         },
       ],
       submit: [
         {
           model: 'login',
           title: "Войти",
           isShown: true,
           action: this.login
         },
         {
           model: 'register',
           title: "Создать аккаунт",
           isShown: false,
           action: this.register
         }
       ],
       status: {
         type: "",
         isShown: false,
         message: ""
       }
     }
   },
   watch: {
     mode() {
       this.tabs.forEach(item => {
         if (this.mode == item.model) {
           item.isPressed = true
         } else {
           item.isPressed = false
         }
       });
       this.inputs.forEach(item => {
         if (this.mode == item.model || item.model == 'all') {
           item.isShown = true
         } else {
           item.isShown = false
         }
       });
       this.submit.forEach(item => {
         if (this.mode == item.model) {
           item.isShown = true
         } else {
           item.isShown = false
         }
       });
     }
   },
   methods: {
     login: async function() {
       let login, password;
       this.inputs.forEach(item => {
         if (item.id == 'login') login = item.state;
         if (item.id == 'password') password = item.state;
       });
       let response;
       try {
         response = await axios.post('auth/login', {
           login: login,
           password: password
         });
       } catch(err) {
         if (err.response.status == 400) {
           this.status.message = "Вы ввели неверный логин или пароль.";
           this.status.type = 'error';
           this.status.isShown = true;
         }
         if (err.response.status == 500) {
           this.status.message = "Сервер не отвечает попробуйте позже.";
           this.status.type = 'error';
           this.status.isShown = true;
         }
         console.log(`${err.response.status} ${err.response.statusText}: ${err.response.data}`);
         return
       }
       this.$store.dispatch('auth/handleTokens', {
         accessToken: response.data.accessToken,
         refreshToken: response.data.refreshToken
       });
       if (response.status == 201) {
         this.$store.dispatch('auth/checkAuth');
         this.$router.push('/');
       }
     },
     register: async function() {
       let firstname, lastname, login, password, email;
       let fieldError = { status: false, message: '' };
       this.inputs.forEach(item => {
         if (fieldError.status) return;
         if (item.id == 'firstname') firstname = item.state;
         if (item.id == 'lastname') lastname = item.state;
         if (item.id == 'email') {
           email = item.state;
           let validEmail = /.{1,}@.{1,}/
           if (!validEmail.test(email)) {
             fieldError.status = true;
             fieldError.message = "Вы неверно ввели почту.";
           }
         }
         if (item.id == 'login') login = item.state;
         if (item.id == 'password') {
           password = item.state;
           let validPassword = /.{6,}/
           if (!validPassword.test(password)) {
             fieldError.status = true;
             fieldError.message = "В пароле должно быть минимум 6 символов.";
           }
         }
       });
       if (fieldError.status) {
         this.status.type = 'error';
         this.status.isShown = true;
         this.status.message = fieldError.message;
         return
       }
       let response;
       try {
         response = await axios.post('auth/register', {
           name: {
             firstname: firstname,
             lastname: lastname,
           },
           email: email,
           login: login,
           password: password
         });
       } catch(err) {
         if (err.response.status == 409) {
           this.status.message = "Пользователь с таким логином или почтой уже зарегистрирован.";
           this.status.type = 'error';
           this.status.isShown = true;
         }
         if (err.response.status == 500) {
           this.status.message = "Сервер не отвечает попробуйте позже.";
           this.status.type = 'error';
           this.status.isShown = true;
         }
         console.log(`${err.response.status} ${err.response.statusText}: ${err.response.data}`);
         return
       }
       if (response.status == 201) {
         this.mode = 'login';
         this.status.message = "Пользователь успешно создан.";
         this.status.type = 'success';
         this.status.isShown = true;
         this.inputs.forEach(item => {
           if (item.id == 'login') item.state = login;
           if (item.id == 'password') item.state = password;
         });
       }
     },
     switchTabs(currentTab) {
       this.status.isShown = false;
       this.mode = currentTab.model;
     }
   }
 }
</script>

<style lang="css" scoped>
</style>
