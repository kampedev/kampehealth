<template>
  <div class="sidebar-pinned ">
    <aside class="admin-sidebar">
    <div class="admin-sidebar-brand">
        <!-- begin sidebar branding-->
        <img class="admin-brand-logo" src="/assets/img/kgshia_logo.png" width="40" alt="atmos Logo">
        <!-- end sidebar branding-->
        <div class="ml-auto">
            <!-- sidebar pin-->
            <a href="#" class="admin-pin-sidebar btn-ghost btn btn-rounded-circle"></a>
            <!-- sidebar close for mobile device-->
            <a href="#" class="admin-close-sidebar"></a>
        </div>
    </div>
    <div class="admin-sidebar-wrapper js-scrollbar">
        <ul class="menu">

            <li class="menu-item active " v-if="user.type == 'client'">
                <router-link to="/client-dashboard" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Dashboard
                                                </span>
                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-home "></i>
                                            </span>
                </router-link>
            </li>

            <li class="menu-item active " v-if="user.type == 'hmo'">
                <router-link to="/hmo-dashboard" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Dashboard
                                                </span>
                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-home "></i>
                                            </span>
                </router-link>
            </li>

            <li class="menu-item active " v-if="user.type == 'provider'">
                <router-link to="/provider-dashboard" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Dashboard
                                                </span>
                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-home "></i>
                                            </span>
                </router-link>
            </li>


            <li class="menu-item active " v-if="user.type == 'shis' || user.role == 1">
                <a href="/state-dashboard" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Dashboard
                                                </span>
                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-home "></i>
                                            </span>
                </a>
            </li>

            <li class="menu-item active " v-if="user.type == 'employee'">
                <a href="/employee-dashboard" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Dashboard
                                                </span>
                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-home "></i>
                                            </span>
                </a>
            </li>

            <li class="menu-item" v-if="user.type == 'employee'">
                <a href="/manage-clients" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Manage Enrollees
                                                </span>
                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-users "></i>
                                            </span>
                </a>
            </li>

            <li class="menu-item" v-if="user.type == 'employee'">
                <a href="/add-client/employee-offline" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Offline Management
                                                </span>
                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-cloud-off "></i>
                                            </span>
                </a>
            </li>

            <li class="menu-item"  v-if="user.type == 'hmo'">
                <router-link href="/fund-manager" class="menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Fund Manager
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-credit-card "></i>
                                            </span>
                </router-link>
            </li>
            <li class="menu-item"  v-if="user.type == 'shis' || user.role == 1">
                <router-link href="#" class="menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Fund Manager
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-credit-card "></i>
                                            </span>
                </router-link>
            </li>
            <li class="menu-item"  v-if="user.type == 'client'">
                <router-link to="/my-funds" class="menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">My Funds
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-credit-card "></i>
                                            </span>
                </router-link>
            </li>

            <li class="menu-item "  v-if="user.type == 'hmo' ">
                <a href="#" class="open-dropdown menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Plans Manager
                                                    <span class="menu-arrow"></span>
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder mdi mdi-checkbook "></i>
                                            </span>
                </a>
                <!--submenu-->
                <ul class="sub-menu">

                    <li class="menu-item">
                        <router-link to="/add-plan" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">Add Plan
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder  fe fe-edit"></i>
                                            </span>
                        </router-link>
                    </li>

                    <li class="menu-item">
                        <router-link to="/plans" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">View Plans
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder mdi mdi-view-day "></i>
                                            </span>
                        </router-link>
                    </li>

                </ul>
            </li>

            <li class="menu-item" v-if="user.type == 'tpa'">
                <a href="/add-client/employee-offline" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">View Enrollees
                                                </span>
                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-cloud-off "></i>
                                            </span>
                </a>
            </li>
            <li class="menu-item" v-if="user.type == 'tpa'">
                <a href="/add-client/employee-offline" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Add Agent
                                                </span>
                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-cloud-off "></i>
                                            </span>
                </a>
            </li>

            <!-- <li class="menu-item "  v-if="user.type == 'shis' || user.role == 1">
                <a href="#" class="open-dropdown menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Plans Manager
                                                    <span class="menu-arrow"></span>
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder mdi mdi-checkbook "></i>
                                            </span>
                </a>

                <ul class="sub-menu">

                    <li class="menu-item">
                        <router-link to="/add-plan" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">Add Plan
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder  fe fe-edit"></i>
                                            </span>
                        </router-link>
                    </li>

                    <li class="menu-item">
                        <router-link to="/plans" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">View Plans
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder mdi mdi-view-day "></i>
                                            </span>
                        </router-link>
                    </li>

                </ul>
            </li> -->

            <li class="menu-item "  v-if="user.type == 'hmo' ">
                <a href="#" class="open-dropdown menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Clients
                                                    <span class="menu-arrow"></span>
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-users "></i>
                                            </span>
                </a>
                <!--submenu-->
                <ul class="sub-menu">

                    <li class="menu-item">
                        <router-link to="/add-client-agency" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">Add Client
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder fe fe-edit"></i>
                                            </span>
                        </router-link>
                    </li>

                    <li class="menu-item">
                        <router-link to="/view-clients-agency" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">View Clients
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder mdi mdi-view-day "></i>
                                            </span>
                        </router-link>
                    </li>

                </ul>
            </li>

            <li class="menu-item "  v-if="user.type == 'provider'">
                <a href="#" class="open-dropdown menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Clients
                                                    <span class="menu-arrow"></span>
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-users "></i>
                                            </span>
                </a>
                <!--submenu-->
                <ul class="sub-menu">

                    <li class="menu-item">
                        <router-link to="/add-client-provider" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">Add Client
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder fe fe-edit"></i>
                                            </span>
                        </router-link>
                    </li>

                    <li class="menu-item">
                        <router-link to="/view-clients-provider" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">View Clients
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder mdi mdi-view-day "></i>
                                            </span>
                        </router-link>
                    </li>

                </ul>
            </li>


                        <li class="menu-item "  v-if="user.type == 'shis' || user.role == 1">
                            <a href="#" class="open-dropdown menu-link">
                                    <span class="menu-label">
                                                            <span class="menu-name">Clients
                                                                <span class="menu-arrow"></span>
                                                            </span>

                                                        </span>
                                <span class="menu-icon">
                                                             <i class="icon-placeholder fe fe-users "></i>
                                                        </span>
                            </a>
                            <!--submenu-->
                            <ul class="sub-menu">

                                <li class="menu-item">
                                    <a href="/add-client-agency" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Add Client
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder fe fe-edit"></i>
                                                        </span>
                                    </a>
                                </li>

                                <li class="menu-item">
                                    <router-link to="/add-client-offline" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Enrollees(Offline)
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder fe fe-cloud-off"></i>
                                                        </span>
                                    </router-link>
                                </li>

                                <li class="menu-item">
                                    <a href="/view-clients-agency" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">View Clients
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder mdi mdi-view-day "></i>
                                                        </span>
                                    </a>
                                </li>

                            </ul>
                        </li>
                        <li class="menu-item "  v-if="user.type == 'client'">
                            <a href="#" class="open-dropdown menu-link">
                                    <span class="menu-label">
                                                            <span class="menu-name">Dependents
                                                                <span class="menu-arrow"></span>
                                                            </span>

                                                        </span>
                                <span class="menu-icon">
                                                             <i class="icon-placeholder fe fe-users "></i>
                                                        </span>
                            </a>
                            <!--submenu-->
                            <ul class="sub-menu">

                                <li class="menu-item">
                                    <router-link to="/add-dependents" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Add Dependents
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder fe fe-edit"></i>
                                                        </span>
                                    </router-link>
                                </li>

                                <li class="menu-item">
                                    <router-link to="/my-dependents" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">View Dependents
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder mdi mdi-view-day "></i>
                                                        </span>
                                    </router-link>
                                </li>

                            </ul>
                        </li>

            <li class="menu-item "  v-if="user.type == 'hmo'">
                <a href="#" class="open-dropdown menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">HR Management
                                                    <span class="menu-arrow"></span>
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-briefcase "></i>
                                            </span>
                </a>
                <!--submenu-->
                <ul class="sub-menu">

                    <li class="menu-item">
                        <router-link to="/add-employee" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">Add Employee
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder fe fe-edit "></i>
                                            </span>
                        </router-link>
                    </li>

                    <li class="menu-item">
                        <router-link to="/my-employees" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">My Employees
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder mdi mdi-view-day "></i>
                                            </span>
                        </router-link>
                    </li>

                </ul>
            </li>

            <li class="menu-item "  v-if="user.type == 'shis' || user.role == 1">
                <a href="#" class="open-dropdown menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">HR Management
                                                    <span class="menu-arrow"></span>
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-briefcase "></i>
                                            </span>
                </a>
                <!--submenu-->
                <ul class="sub-menu">

                    <li class="menu-item">
                        <a href="/add-employee-state" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">Add Employee
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder fe fe-edit "></i>
                                            </span>
                        </a>
                    </li>

                    <li class="menu-item">
                        <a href="/my-employees" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">My Employees
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder mdi mdi-view-day "></i>
                                            </span>
                        </a>
                    </li>

                </ul>
            </li>

            <li class="menu-item "  v-if="user.type == 'provider'">
                <a href="#" class="open-dropdown menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">HR Management
                                                    <span class="menu-arrow"></span>
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-briefcase "></i>
                                            </span>
                </a>
                <!--submenu-->
                <ul class="sub-menu">

                    <li class="menu-item">
                        <router-link to="/add-employee" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">Add Employee
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder fe fe-edit "></i>
                                            </span>
                        </router-link>
                    </li>

                    <li class="menu-item">
                        <router-link to="/my-employees" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">My Employees
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder mdi mdi-view-day "></i>
                                            </span>
                        </router-link>
                    </li>

                </ul>
            </li>


            <li class="menu-item "  v-if="user.type == 'provider'">
                <a href="#" class="open-dropdown menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Inventory Management
                                                    <span class="menu-arrow"></span>
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-clipboard "></i>
                                            </span>
                </a>
                <!--submenu-->
                <ul class="sub-menu">

                    <li class="menu-item">
                        <router-link to="/add-inventory" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">Add inventory
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder fe fe-edit "></i>
                                            </span>
                        </router-link>
                    </li>

                    <li class="menu-item">
                        <router-link to="/my-inventories" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">My Inventories
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder mdi mdi-view-day "></i>
                                            </span>
                        </router-link>
                    </li>

                </ul>
            </li>

            <li class="menu-item "  v-if="user.type == 'shis' || user.role == 1">
                <a href="#" class="open-dropdown menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Claims and Referrals Manager
                                                    <span class="menu-arrow"></span>
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-grid"></i>
                                            </span>
                </a>
                <!--submenu-->
                <ul class="sub-menu">

                    <li class="menu-item">
                        <router-link to="/add-claim" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">Add Claim
                                                </span>
                                            </span>

                            <span class="menu-icon">

                                                    <i class="icon-placeholder  fe fe-edit "></i>
                                            </span>
                        </router-link>
                    </li>
                    <li class="menu-item">
                        <router-link to="/add-claim" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">View Claims
                                                </span>
                                            </span>

                            <span class="menu-icon">

                                                    <i class="icon-placeholder  mdi mdi-view-day "></i>
                                            </span>
                        </router-link>
                    </li>

                    <li class="menu-item">
                        <router-link to="/add-referral" class=" menu-link">
                                        <span class="menu-label">
                                                <span class="menu-name">Referrals Manager
                                                </span>
                                            </span>
                            <span class="menu-icon">

                                                    <i class="icon-placeholder mdi mdi-view-day "></i>
                                            </span>
                        </router-link>
                    </li>

                </ul>
            </li>


                        <li class="menu-item "  v-if="user.type == 'shis' || user.role == 1">
                            <a href="#" class="open-dropdown menu-link">
                                    <span class="menu-label">
                                                            <span class="menu-name">Drugs and Consultancy Manager
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
                                    <router-link to="/manage-drugs" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Drugs manager
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder fe fe-edit "></i>
                                                        </span>
                                    </router-link>
                                </li>
                                <li class="menu-item">
                                    <router-link to="/manage-services" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Fees for Professional service
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder  mdi mdi-view-day "></i>
                                                        </span>
                                    </router-link>
                                </li>

                                <li class="menu-item">
                                    <router-link to="/service-summary-form" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Service Summary Form
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder mdi mdi-view-day "></i>
                                                        </span>
                                    </router-link>
                                </li>


                            </ul>
                        </li>

                        <li class="menu-item "  v-if="user.type == 'shis' || user.role == 1">
                            <a href="#" class="open-dropdown menu-link">
                                    <span class="menu-label">
                                                            <span class="menu-name">Others
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
                                    <router-link to="/quality-assurance" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Quality Assurance
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder  fe fe-check-circle"></i>
                                                        </span>
                                    </router-link>
                                </li>
                                <li class="menu-item">
                                    <router-link to="/transfer-of-hcp" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Change of HCP Form
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder  mdi mdi-view-day "></i>
                                                        </span>
                                    </router-link>
                                </li>
                                <li class="menu-item">
                                    <router-link to="/ward-manager" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Ward Manager
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder  fe fe-map-pin"></i>
                                                        </span>
                                    </router-link>
                                </li>

                            </ul>
                        </li>
            <li class="menu-item  "  v-if="user.type == 'provider'">
                <router-link to="/add-agency" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">My Agencies
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-briefcase "></i>
                                            </span>
                </router-link>
            </li>
            <li class="menu-item  "  v-if="user.type == 'hmo'">
                <router-link to="/my-providers" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">My Providers
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-activity"></i>
                                            </span>
                </router-link>
            </li>

            <li class="menu-item  "  v-if="user.type == 'shis' || user.role == 1">
                <a href="/my-providers" class=" menu-link">
                        <span class="menu-label">
                              <span class="menu-name">Health Facilities</span>
                        </span>
                    <span class="menu-icon">
                      <i class="icon-placeholder fe fe-activity"></i>
                    </span>
                </a>
            </li>

            <li class="menu-item  "  v-if="user.type == 'shis' || user.role == 1">
                <a href="/mda-manager" class=" menu-link">
                        <span class="menu-label">
                              <span class="menu-name">MDAs</span>
                        </span>
                    <span class="menu-icon">
                      <i class="icon-placeholder fe fe-airplay"></i>
                    </span>
                </a>
            </li>

            <!-- <li class="menu-item active "  v-if="user.type == 'client'">
                <a href="add-complaint" class=" menu-link">
                        <span class="menu-label">
                                                <span class="menu-name">Complaints
                                                </span>

                                            </span>
                    <span class="menu-icon">
                                                 <i class="icon-placeholder fe fe-thumbs-down "></i>
                                            </span>
                </a>
            </li> -->

                        <li class="menu-item "  v-if="user.type == 'client'">
                            <a href="#" class="open-dropdown menu-link">
                                    <span class="menu-label">
                                                            <span class="menu-name">Complaints
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
                                    <router-link to="/add-complaint" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Make Complaint
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder fe fe-edit "></i>
                                                        </span>
                                    </router-link>
                                </li>

                                <li class="menu-item">
                                    <router-link to="/my-complaints" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">View Complaints
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder mdi mdi-view-day "></i>
                                                        </span>
                                    </router-link>
                                </li>

                            </ul>
                        </li>

                        <li class="menu-item "  v-if="user.type == 'provider'">
                            <a href="#" class="open-dropdown menu-link">
                                    <span class="menu-label">
                                                            <span class="menu-name">EHR
                                                                <span class="menu-arrow"></span>
                                                            </span>

                                                        </span>
                                <span class="menu-icon">
                                                             <i class="icon-placeholder fe fe-activity"></i>
                                                        </span>
                            </a>
                            <!--submenu-->
                            <ul class="sub-menu">

                                <li class="menu-item">
                                    <router-link to="/add-record" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Add Record
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder fe fe-edit "></i>
                                                        </span>
                                    </router-link>
                                </li>

                                <li class="menu-item">
                                    <router-link to="/my-records" class=" menu-link">
                                                    <span class="menu-label">
                                                            <span class="menu-name">Client's Records
                                                            </span>
                                                        </span>
                                        <span class="menu-icon">

                                                                <i class="icon-placeholder mdi mdi-view-day "></i>
                                                        </span>
                                    </router-link>
                                </li>

                            </ul>
                        </li>

        </ul>

    </div>

</aside>

<Header/>

  </div>
</template>

<script>
  import Header from '@/views/Header.vue'

export default {

  components: {
    Header
  },
  data(){
    return{
      user:null

    }
  },
  beforeMount(){
    this.user = JSON.parse(localStorage.getItem('user'))

  },
  methods:{

  },
  created(){

  }
}
</script>
