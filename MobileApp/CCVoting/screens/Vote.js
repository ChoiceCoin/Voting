import React from "react";
import PagerView from "react-native-pager-view";
import { View } from "react-native";


//import { Vote } from "./components/Info";

export function Fvote({ navigation }) {
    return (
       <PagerView initialPage={0} style={{ flex: 1 }}>
          <View style={{ flex: 1 }} key="1">
             <Vote
                navigation={navigation}
                name="John Smith"
                image="http://xekhai.com.ng/ccui/CCUI/assets/images/team1.jpg"
                role="Programmer"
                desc="A team leader leads, monitors, and supervises a group of employees to achieve goals that contribute to the growth of the organization. Team leaders motivate and inspire their team by creating an environment that promotes positive communication, encourages bonding of team members, and demonstrates flexibility."
             />
          </View>
          <View style={{ flex: 1 }} key="2">
             <Vote
                navigation={navigation}
                name="Sarah Palmer"
                image="http://xekhai.com.ng/ccui/CCUI/assets/images/team2.jpg"
                role="Manager"
                desc="As a team leader, you will be the contact point for all team members, so your communication skills should be excellent. You should also be able to act proactively to ensure smooth team operations and effective collaboration."
             />
          </View>
          <View style={{ flex: 1 }} key="3">
             <Vote
                navigation={navigation}
                name="Jessica Swift"
                image="http://xekhai.com.ng/ccui/CCUI/assets/images/team3.jpg"
                role="Analyst"
                desc="Team leaders play key roles in an organization as they provide direction and guidance to team members working to achieve a goal, such as a work project. Learn about the description, roles, and responsibilities of team leaders. Explore tasks completed by team leaders, such as developing a team strategy, training team members, facilitating team communication, monitoring and managing a team's work, and creating progress reports."
             />
          </View>
       </PagerView>
    );
 }
 