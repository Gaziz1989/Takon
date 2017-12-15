<style src="./style.css" scoped></style>
<template>
  <panel>
    <div class="mainInfo">
      <h6>Страница профиля</h6>
      <info-div title="Имя" :text="user.name"/>
      <info-div title="Адрес" :text="user.adress"/>
      <info-div title="Номер телефона" :text="user.phone"/>
      <info-div title="E-mail" :text="user.email"/>
      <v-btn @click="editProfile" flat small class="mainbtn">Редактировать</v-btn>
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
          phone: '',
          email: '',
          adress: '',
          id: ''
        },
        error: ''
      }
    },
    computed: {
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
      async getUser () {
        try {
          const { id } = this.$auth.currentUser()
          const response = await UsersService.getUser(id)
          this.user = response.data.user
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
}
</script>
