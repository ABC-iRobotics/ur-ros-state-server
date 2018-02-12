cmake_minimum_required(VERSION 2.8.3)
project(ur5_state_server)

find_package(catkin REQUIRED)

###################################
## catkin specific configuration ##
###################################
catkin_package()

#############
## Install ##
#############

install(PROGRAMS
   scripts/ur5_state_server.js
   DESTINATION ${CATKIN_PACKAGE_BIN_DESTINATION}
)

