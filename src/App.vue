<template>
  <v-app id="vcrm">
    <vue-progress-bar v-if="signedIn"> </vue-progress-bar>
    <template v-if="!signedIn">
      <router-view></router-view>
    </template>
    <template v-if="signedIn">
      <v-navigation-drawer class="blue lighten-5" mini-variant-width="70" width="250" light :mini-variant.sync="mini" v-model="drawer" app>
        <v-list class="pa-0">
          <v-list-item tag="div">
            <v-list-item-action>
              <v-img max-width="2.5em" class="avatar" src="@/assets/avatar0.png" />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ user.firstname }}{{ user.lastname }}</v-list-item-title>
            </v-list-item-content>
            <!-- <v-spacer></v-spacer> -->
            <v-list-item-action style="max-width:1em">
              <v-menu bottom right offset-y origin="bottom right" transition="v-slide-y-transition">
                <template v-slot:activator="{ on }">
                  <v-btn icon small light slot="activator" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="item in userMenus" :key="item.title" value="true" @click="handleUserActions(item)" router>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action>
            <v-list-item-action style="max-width:1em">
              <v-btn icon small @click.native.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" @click="handleNavigtiion(item)" router>
            <v-list-item-action class="pr-1 pl-2 mr-1">
              <v-icon :class="activeMenuItem.includes(item.title) ? 'blue--text' : ''" :title="item.title">
                {{ item.icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content :class="activeMenuItem.includes(item.title) ? 'blue--text' : ''">
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app elevation=1>
        <v-app-bar-nav-icon @click.native.stop="drawer = !drawer" light></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <div class="text-xs-center pr-3 mt-2">
          <v-badge left="">
            <span slot="badge">6</span>
            <v-icon large color="grey lighten-1">mdi-bell-outline</v-icon>
          </v-badge>

          <v-badge color="red">
            <span slot="badge">!</span>
            <v-icon large color="grey">mdi-email-outline</v-icon>
          </v-badge>
        </div>
      </v-app-bar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer :inset="true" style="justify-content:center; text-align: center" app>
        <span>&copy; Vue-CRM 2020</span>
      </v-footer>
    </template>
  </v-app>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import { userModule } from '@/store/modules/user';


@Component
export default class App extends Vue {
  get signedIn() {
    return userModule.isSignedIn;
  }

  get user() {
    return userModule.user;
  }

  private dialog = false;
  private mini = false;
  private dialogText = '';
  private dialogTitle = '';
  private isRootComponent = true;
  public drawer = window.innerWidth > 960;
  private fixed = false;
  private items: AppMenu[] = [
    {
      icon: 'mdi-view-dashboard',
      title: 'Dashboard',
      vertical: 'Dashboard',
      link: 'dashboard'
    },
    {
      icon: 'mdi-point-of-sale',
      title: 'Order',
      vertical: 'Order',
      link: 'orders'
    },
    {
      icon: 'mdi-account-group',
      title: 'Customer',
      vertical: 'Customer',
      link: 'customers'
    },
    {
      icon: 'mdi-book-multiple',
      title: 'Product',
      vertical: 'Product',
      link: 'products'
    },
    {
      icon: 'mdi-information-outline',
      title: 'About',
      vertical: 'About',
      link: 'about'
    }
  ];

  private userMenus: AppMenu[]  = [
    {
      icon: 'bubble_chart',
      title: 'Logout',
      link: 'login'
    },
    {
      icon: 'bubble_chart',
      title: 'Change Password',
      link: 'changepassword'
    }
  ];

  private miniVariant = false;
  private right = true;
  private rightDrawer = false;
  private menuItem = '';

  created() {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, _from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      
      //  start the progress bar
      this.$Progress.start();

      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      if (to.name !== 'ErrorPage') {
        this.menuItem = to.name;
      }
      //  finish the progress bar
      this.$Progress.finish();
    });
  
  }

  get activeMenuItem() {
    return this.menuItem;
  }

  handleNavigtiion(item: TODO) {
    this.menuItem = item.title;
    this.$router.push({
      name: item.link
    });
  }

  async handleUserActions(item: TODO) {
    this.menuItem = item.title;
    if (item.title === 'Logout') {
      await userModule.logout();
    }
    this.$router.push(item.link);
  }

  mounted() {
  }
}
</script>
<style scoped>
.avatar {
  border-radius: 50%;
}
</style>
