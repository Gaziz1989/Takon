<style src="./style.css" scoped></style>
<template>
  <panel>
    <div class="picdiv">
      <h6>Профиль: {{user.id}}</h6>
      <div class='error' v-html="error"/>
      <div v-if="!user.image" class="inputforimg">
        <label>
          <div>
            <img src="../../../static/pics/defaultPic.png" alt="Profile Pic">
            <input type="file" @change="onFileChange">
          </div>
        </label>
      </div>
      <div v-else class="inputforimg">
        <label>
          <div>
            <img :src="getImage" alt="Profile Pic"/> <br/>
            <input type="file" @change="onFileChange">
          </div>
        </label>
          <v-btn v-if="filename" @click="saveImage" fab small><i class="fa fa-cloud-upload" aria-hidden="true"></i></v-btn>
      </div>
    </div>
    <div class="mainInfo">
      <div style="width: 50%;"><v-btn @click="editProfile" flat small class="mainbtn">Редактировать</v-btn></div>
      <info-div title="Имя" :text="user.name"/>
      <info-div title="Фамилия" :text="user.lastname"/>
      <info-div title="Номер телефона" :text="user.phone"/>
      <info-div title="E-mail" :text="user.email"/>
      <info-div title="Пол" :text="user.gender"/>
      <info-div title="Роль" :text="user.role"/>
      <info-div title="Пользователь Trello(username)" :text="user.trelloname"/>
      <info-div title="Token Trello" :text="user.trellotoken" v-if="getType"/>
      <info-div title="Заработная плата" :text="user.salary"/>
      <info-div title="Дата рождения" :text="user.birthday" v-if="getType"/>
      <info-div title="Дата рождения" :text="user.birthday" v-else full/>
      <info-div title="Дата начала работы" :text="user.entry"/>
      <info-div title="Дата увольнения" :text="user.exit"/>
    </div>
  </panel>
</template>

<script>
  import Panel from '@/components/panel'
  import infoDiv from '@/components/info'
  import UsersService from '@/services/UsersService'
export default {
    name: 'Profile',
    components: {
      Panel,
      infoDiv
    },
    data () {
      return {
        user: {
          name: '',
          lastname: '',
          gender: '',
          phone: '',
          image: '',
          birthday: '',
          entry: '',
          exit: '',
          projects: '',
          role: '',
          salary: '',
          trelloname: '',
          trellotoken: '',
          email: '',
          id: ''
        },
        file: '',
        filename: '',
        error: ''
      }
    },
    computed: {
      getImage () {
        if (!this.filename) {
          return `http://localhost:8081/${this.user.image}`
        } else {
          return this.user.image
        }
      },
      getType () {
        if (this.$auth.currentUser().type === 'admin') {
          return true
        } else {
          return false
        }
      }
    },
    mounted () {
      this.getUser()
    },
    methods: {
      editProfile () {
        this.$router.push({
          name: 'ProfileEdit'
        })
        // window.location.reload()
      },
      onFileChange (event) {
        var files = event.target.files || event.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.user.image = e.target.result
          this.file = file
          this.filename = file.name
        }
        reader.readAsDataURL(file)
      },
      async saveImage () {
        try {
          const { id } = this.$auth.currentUser()
          const response = await UsersService.changeimage(this.file, id)
          // console.log(response.data.user.image)
          this.user.image = response.data.user.image
          this.filename = ''
        } catch (error) {
          this.error = error.response.data.error
        }
      },
      async getUser () {
        try {
          const { id } = this.$auth.currentUser()
          const response = await UsersService.getUser(id)
          // const { birthday, email, entry, exit, gender, id, image, lastname, name, phone, role, trello, projects } = response.data.user
          this.user = response.data.user
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
}
</script>
