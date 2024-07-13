<template>
  <div class="sidebar-pinned">
    <aside class="admin-sidebar">
      <div class="admin-sidebar-brand">
        <!-- begin sidebar branding-->
        <img
          class="admin-brand-logo"
          src="/assets/img/ohis_logo.png"
          width="40"
          alt="atmos Logo"
        />
        <!-- end sidebar branding-->
        <div class="ml-auto">
          <!-- sidebar pin-->
          <a
            href="#"
            class="admin-pin-sidebar btn-ghost btn btn-rounded-circle"
          ></a>
          <!-- sidebar close for mobile device-->
          <a href="#" class="admin-close-sidebar"></a>
        </div>
      </div>
      <div class="admin-sidebar-wrapper js-scrollbar">
        <ul class="menu">
          <li class="menu-item active" v-if="user.type == 'client'">
            <router-link to="/client-dashboard" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Dashboard </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-home"></i>
              </span>
            </router-link>
          </li>

          <li class="menu-item active" v-if="user.type == 'tpa'">
            <router-link to="/tpa-dashboard" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Dashboard </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-home"></i>
              </span>
            </router-link>
          </li>

          <li class="menu-item active" v-if="user.type == 'tpa_employee'">
            <router-link to="/tpa-employee-dashboard" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Dashboard </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-home"></i>
              </span>
            </router-link>
          </li>

          <li class="menu-item active" v-if="user.type == 'hmo'">
            <router-link to="/hmo-dashboard" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Dashboard </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-home"></i>
              </span>
            </router-link>
          </li>

          <li
            class="menu-item active"
            v-if="user.type == 'shis' || user.user_role == 1"
          >
            <a href="/state-dashboard" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Dashboard </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-home"></i>
              </span>
            </a>
          </li>

          <li
            class="menu-item active"
            v-if="user.type == 'employee' && user.user_role == 0"
          >
            <a href="/employee-dashboard" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Dashboard </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-home"></i>
              </span>
            </a>
          </li>

          <li class="menu-item" v-if="user.type == 'provider_employee'">
            <a href="/personnel" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">My Dashboard </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-home"></i>
              </span>
            </a>
          </li>

          <li class="menu-item" v-if="user.type == 'hmo'">
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >Clients
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-users"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <router-link to="/add-client-agency" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Client </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-edit"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item">
                <router-link to="/view-clients-agency" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">View Clients </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-view-day"></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>

          <li
            class="menu-item"
            v-if="user.type == 'provider' || user.type == 'provider_employee'"
          >
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >Facility Data
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-airplay"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <router-link to="/provider-dashboard" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Facility Dashboard </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-bar-chart-2"></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/add-client-provider" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Other Patient </span>
                  </span>
                  <span class="menu-icon">
                    <i
                      class="icon-placeholder mdi mdi-account-multiple-plus"
                    ></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/view-clients-provider" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">View Enrollees </span>
                  </span>
                  <span class="menu-icon">
                    <i
                      class="icon-placeholder mdi mdi-account-group-outline"
                    ></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>

          <li
            class="menu-item"
            v-if="
              user.type == 'employee' ||
              user.type == 'tpa' ||
              user.type == 'tpa_employee' ||
              user.type == 'shis'
            "
          >
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >Clients
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-users"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <a href="/add-client-agency" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Enrollee (Informal) </span>
                  </span>
                  <span class="menu-icon">
                    <i
                      class="icon-placeholder mdi mdi-account-multiple-plus"
                    ></i>
                  </span>
                </a>
              </li>
              <li class="menu-item">
                <a href="/add-client-formal" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Enrollee (Formal) </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-user-plus"></i>
                  </span>
                </a>
              </li>

              <li class="menu-item">
                <a href="/voluntary-registration-form" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Voluntary Enrollment</span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-user-plus"></i>
                  </span>
                </a>
              </li>

              <li class="menu-item">
                <a href="/diaspora-registration" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Diaspora Enrollment</span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-user-plus"></i>
                  </span>
                </a>
              </li>

              <!-- <li class="menu-item">
                <router-link to="/add-client-offline" class=" menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Enrollees(Offline) </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-cloud-off"></i>
                  </span>
                </router-link>
              </li> -->
              <li class="menu-item" v-if="user.type == 'employee'">
                <a href="/manage-clients" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Manage Enrollees </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-users"></i>
                  </span>
                </a>
              </li>

              <li class="menu-item">
                <a href="/add-client/employee-offline" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Offline Management </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-cloud-off"></i>
                  </span>
                </a>
              </li>

              <li class="menu-item" v-if="user.type == 'employee'">
                <a href="/change-facility-requests" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Change Facility Requests</span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-paper-clip"></i>
                  </span>
                </a>
              </li>

              <li
                class="menu-item"
                v-if="user.type == 'employee' || user.type == 'shis'"
              >
                <a href="/view-clients-agency" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">View Clients </span>
                  </span>
                  <span class="menu-icon">
                    <i
                      class="icon-placeholder mdi mdi-account-group-outline"
                    ></i>
                  </span>
                </a>
              </li>
              <li
                class="menu-item"
                v-if="user.type == 'shis' || user.user_role == 1"
              >
                <a href="/manage-extra" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Manage Expiries </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-view-day"></i>
                  </span>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item" v-if="user.type == 'client'">
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >Dependents
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-users"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <router-link to="/add-dependents" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Dependents </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-edit"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item">
                <router-link to="/my-dependents" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">View Dependents </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-view-day"></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="menu-item" v-if="user.type == 'hmo'">
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >HR Management
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-briefcase"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <router-link to="/add-employee" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Employee </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-edit"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item">
                <router-link to="/my-employees" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">My Employees </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-view-day"></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>

          <li
            class="menu-item"
            v-if="user.type == 'shis' || user.user_role == 1"
          >
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >HR Management
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-briefcase"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <a href="/add-employee-state" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Employee </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-edit"></i>
                  </span>
                </a>
              </li>

              <li class="menu-item">
                <a href="/my-employees" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">My Employees </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-view-day"></i>
                  </span>
                </a>
              </li>
            </ul>
          </li>

          <li class="menu-item" v-if="user.type == 'provider'">
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >HR Management
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-briefcase"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <router-link
                  :to="{ path: '/provider/add-employee/' + user.id }"
                  class="menu-link"
                >
                  <span class="menu-label">
                    <span class="menu-name">Manage Employees </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-edit"></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>

          <li
            class="menu-item"
            v-if="
              user.type == 'shis' ||
              user.type == 'provider' ||
              user.type == 'provider_employee' ||
              user.user_role == 1 ||
              user.job_title == 'Claims Vetter' ||
              user.job_title == 'Claims Verifier'
            "
          >
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >Claims Manager
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-grid"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li
                class="menu-item"
                v-if="user.job_title == 'Executive Secretary'"
              >
                <router-link to="/all-claims-facility" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Approve Claims </span>
                  </span>

                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-edit"></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/all-claims" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Manage Claims </span>
                  </span>

                  <span class="menu-icon">
                    <i
                      class="icon-placeholder mdi mdi-file-document-outline"
                    ></i>
                  </span>
                </router-link>
              </li>

              <!-- <li class="menu-item">
                <router-link to="/add-referral" class=" menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Referral </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-plus-box"></i>
                  </span>
                </router-link>
              </li> -->
              <li class="menu-item">
                <router-link to="/all-referrals" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">View Referrals </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-bank-transfer-out"></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/authorization-code" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Authorization Code</span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-anchor"></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>

          <li
            class="menu-item"
            v-if="
              user.job_title == 'Finance' ||
              user.type == 'provider' ||
              user.job_title == 'Executive Secretary' ||
              user.type == 'shis'
            "
          >
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >Finance Manager
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-credit-card"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <router-link to="/fund-manager" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Finance Dashboard </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-medical-bag"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item">
                <router-link to="/payment-claims" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Claims' Payments </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-credit-card"></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/payment-capitations" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Capitations </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-credit-card"></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>

          <li
            class="menu-item"
            v-if="user.type == 'shis' || user.user_role == 1"
          >
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >Services Manager
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-box"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <router-link to="/my-encounters" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Encounters Management</span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-medical-bag"></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/manage-drugs" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Drugs manager </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-thermometer"></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/manage-services" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Fee for Service </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-view-day"></i>
                  </span>
                </router-link>
              </li>

              <!-- <li class="menu-item">
                <router-link to="/service-summary-form" class=" menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Encounter Attendance Form </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-view-day "></i>
                  </span>
                </router-link>
              </li> -->
            </ul>
          </li>

          <li
            class="menu-item"
            v-if="user.type == 'shis' || user.user_role == 1"
          >
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >Others
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-external-link"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <router-link to="/manage-diagnosis" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Disease List </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-check-circle"></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/upload-enrollee/csv" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Enrollee Upload </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-upload"></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/transfer-of-hcp" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">COF Form </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-bank-transfer"></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/change-facility-requests" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">COF Requests </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-bank-transfer"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item">
                <router-link to="/ward-manager" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Ward Manager </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-map-pin"></i>
                  </span>
                </router-link>
              </li>
              <li class="menu-item">
                <router-link to="/db-query" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">DB Admin </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-database"></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="menu-item" v-if="user.type == 'hmo'">
            <router-link to="/my-providers" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">My Providers </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-activity"></i>
              </span>
            </router-link>
          </li>

          <li
            class="menu-item"
            v-if="user.type == 'shis' || user.user_role == 1"
          >
            <a href="/my-providers" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Health Facilities</span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-activity"></i>
              </span>
            </a>
          </li>
          <!-- <li
            class="menu-item"
            v-if="user.type == 'shis' || user.user_role == 1"
          >
            <a href="/my-tpas" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">TPAs/ HMOs</span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-briefcase"></i>
              </span>
            </a>
          </li> -->

          <li class="menu-item" v-if="user.type == 'tpa'">
            <a href="/view-clients-tpa" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">View Enrollees </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-users"></i>
              </span>
            </a>
          </li>

          <li class="menu-item" v-if="user.type == 'tpa_employee'">
            <a href="/view-clients-tpa" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">View Enrollees </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-users"></i>
              </span>
            </a>
          </li>

          <li class="menu-item" v-if="user.type == 'tpa'">
            <a href="/add-officers" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Add Agents </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-briefcase"></i>
              </span>
            </a>
          </li>

          <li class="menu-item" v-if="user.type == 'tpa_employee'">
            <a href="/add-client-tpa" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Add Enrollee </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-edit"></i>
              </span>
            </a>
          </li>
          <li
            class="menu-item"
            v-if="user.type == 'tpa' || user.type == 'tpa_employee'"
          >
            <a href="/all-claims" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Claims Management </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder mdi mdi-view-day"></i>
              </span>
            </a>
          </li>

          <li
            class="menu-item"
            v-if="user.type == 'tpa' || user.type == 'tpa_employee'"
          >
            <a href="/authorization-code" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">Authorization Code </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-anchor"></i>
              </span>
            </a>
          </li>

          <li class="menu-item" v-if="user.type == 'shis' || user.role == 1">
            <a href="/mda-manager" class="menu-link">
              <span class="menu-label">
                <span class="menu-name">MDAs</span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-airplay"></i>
              </span>
            </a>
          </li>

          <!-- <li class="menu-item" >
                <a href="/my-complaints" class=" menu-link">
                            <span class="menu-label">
                                    <span class="menu-name">Complaints/Inquiry
                                    </span>
                                  </span>
                            <span class="menu-icon">
                          <i class="icon-placeholder  fe fe-thumbs-down"></i>
                                </span>
                </a>
              </li> -->

          <li class="menu-item" v-if="user.type == 'client'">
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >Complaints
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-thumbs-down"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <router-link to="/add-complaint" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Make Complaint </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-edit"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item">
                <router-link to="/my-complaints" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">View Complaints </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-view-day"></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>

          <li class="menu-item" v-if="user.type == 'client'">
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >Complaints
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-thumbs-down"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item">
                <router-link to="/add-complaint" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Make Complaint </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-edit"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item">
                <router-link to="/my-complaints" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">View Complaints </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-view-day"></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>

          <li
            class="menu-item"
            v-if="user.type == 'provider' || user.type == 'provider_employee'"
          >
            <a href="#" class="open-dropdown menu-link">
              <span class="menu-label">
                <span class="menu-name"
                  >EMR
                  <span class="menu-arrow"></span>
                </span>
              </span>
              <span class="menu-icon">
                <i class="icon-placeholder fe fe-activity"></i>
              </span>
            </a>
            <!--submenu-->
            <ul class="sub-menu">
              <li class="menu-item" v-if="user.type == 'provider_employee'">
                <router-link to="/add-record" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Record </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-edit"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item" v-if="user.type == 'provider_employee'">
                <router-link to="/add-record-sec/secondary" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Record Secondary </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-edit"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item" v-if="user.type == 'provider_employee'">
                <router-link to="/add-record-offline" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Add Record Offline </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder fe fe-cloud-off"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item">
                <router-link to="/list-records" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Patient Records </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-medical-bag"></i>
                  </span>
                </router-link>
              </li>

              <li class="menu-item" v-if="user.type == 'provider_employee'">
                <router-link to="/offline-home" class="menu-link">
                  <span class="menu-label">
                    <span class="menu-name">Offline Records </span>
                  </span>
                  <span class="menu-icon">
                    <i class="icon-placeholder mdi mdi-cloud-sync"></i>
                  </span>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>

    <Header />
  </div>
</template>

<script>
import Header from "@/views/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      user: null,
    };
  },
  beforeMount() {
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  methods: {},
  created() {},
};
</script>

<style scoped>
.sidebar-pinned {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
}

.admin-sidebar .admin-sidebar-wrapper {
  overflow-y: scroll;
}
</style>
