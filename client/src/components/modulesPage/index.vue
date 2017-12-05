<style src="./style.css" scoped></style>
<template>
  <div class="modules-wraper">
    <div class="modules">
      <v-toolbar flat dense>
        <v-toolbar-title>Модули</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat fab @click="show"><i class="fa fa-plus-circle" aria-hidden="true"></i> </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="contentTitle" v-if="modules.length>0">
        <div class="moduleTitle">Название</div>
        <div class="information">Информация</div>
        <div class="flatbtn">Действие</div>
      </div>
      <div class="content" v-for="_module in modules">
        <div class="moduleTitle">{{_module.name}}</div>
        <div class="information">
          <b>Тип:</b> {{_module.type}}<br/>
          <b>Стоимость:</b> Джуниор-{{_module.junSum}}, Мидл-{{_module.midSum}}, Синьор-{{_module.senSum}}<br/>
          <b>Время:</b> Джуниор-{{_module.jundeadline}}, Мидл-{{_module.middeadline}}, Синьор-{{_module.sendeadline}}
        </div>
        <div class="flatbtn"><v-btn small fab flat color="error" @click="openEditModal(_module.id)"><i class="fa fa-pencil" aria-hidden="true"></i></v-btn></div>
      </div>
    </div>
    <div class="modules">
      <v-toolbar flat dense>
        <v-toolbar-title>Статические расходы</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat fab @click="showStaticModal"> <i class="fa fa-plus-circle" aria-hidden="true"></i> </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="contentTitle" v-if="expences.length>0">
        <div class="moduleTitle">Название</div>
        <div class="information">Сумма</div>
        <div class="flatbtn">Действие</div>
      </div>
      <div class="content" v-for="_expence in expences">
        <div class="moduleTitle">{{_expence.name}}</div>
        <div class="amount">{{_expence.amount}}</div>
        <div class="flatbtn"><v-btn small fab flat color="error" @click="openEditStatic(_expence.id)"><i class="fa fa-pencil" aria-hidden="true"></i></v-btn></div>
      </div>
    </div>
    <module-modal/>
    <static-modal/>
    <module-edit/>
    <static-edit/>
  </div>
</template>

<script>
  import ModuleModal from '@/components/modals/moduleModal'
  import StaticModal from '@/components/modals/staticModal'
  import ModuleEdit from '@/components/modals/moduleEdit'
  import StaticEdit from '@/components/modals/staticEdit'
  import ModuleService from '@/services/ModuleService'
  import ExpenceService from '@/services/ExpenceService'
export default {
    name: 'ModulesPage',
    components: {
      ModuleModal,
      StaticModal,
      ModuleEdit,
      StaticEdit
    },
    computed: {},
    data () {
      return {
        modules: [],
        expences: []
      }
    },
    beforeMount () {
      this.getModules()
      this.getExpences()
    },
    methods: {
      show () {
        this.$modal.show('ModuleModal')
      },

      showStaticModal () {
        this.$modal.show('StaticModal')
      },

      openEditModal (_id) {
        this.$modal.show('ModuleEdit', {id: _id})
      },

      openEditStatic (_id) {
        this.$modal.show('StaticEdit', {id: _id})
      },
      async getModules () {
        try {
          const response = await ModuleService.getModules()
          this.modules = response.data.modules
        } catch (error) {
          alert(error.response.data.error)
        }
      },
      async getExpences () {
        try {
          const response = await ExpenceService.getExpences()
          this.expences = response.data.expences
        } catch (error) {
          alert(error.response.data.error)
        }
      }
    }
}
</script>
