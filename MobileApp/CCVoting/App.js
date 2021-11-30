import React from "react";
import { Image, NativeBaseProvider, Button, VStack, Text } from "native-base";
import { Modal } from "native-base";
import { useState } from "react";
import { FormControl, Input, Center } from "native-base";
import { Box, Heading, AspectRatio, HStack, Stack } from "native-base";
import PagerView from "react-native-pager-view";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

function Home({ navigation }) {
   const [showModal, setShowModal] = useState(false);

   return (
      <NativeBaseProvider>
         <VStack p="5" pb="10" h="full" justifyContent="flex-end">
            <Image
               size="200"
               resizeMode="cover"
               my="2"
               source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/tikka-1f350.appspot.com/o/icons%2Fcclogo.png?alt=media&token=555666b3-6fca-4947-8f15-24926682957c",
               }}
               alignSelf="center"
               mb="10"
               alt="logo"
            />
            <Text mb="11" fontWeight="bold">
               Choice Coin Voting
            </Text>
            <Text mb="30" fontSize="24">
               Algorand Voting Software
            </Text>
            <Text mb="130">
               This program is a free software that allows people to vote on and
               track decisions in order to encourage robust public participation
               and empower people to build a more inclusive, collaborative, and
               open political system.
            </Text>
            <Button variant="link" size="lg" colorScheme="dark" my="5">
               View Candidate Details
            </Button>
            <Button
               onPress={() => setShowModal(true)}
               size="lg"
               colorScheme="teal"
            >
               Vote
            </Button>
         </VStack>

         <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
               <Modal.CloseButton />
               <Modal.Header>Verify Information</Modal.Header>
               <Modal.Body>
                  <FormControl>
                     <FormControl.Label>Email</FormControl.Label>
                     <Input />
                  </FormControl>
                  <FormControl mt="3">
                     <FormControl.Label>Drivers License</FormControl.Label>
                     <Input />
                     <FormControl.Label mt="3">SSN</FormControl.Label>
                     <Input />
                  </FormControl>
               </Modal.Body>
               <Modal.Footer>
                  <Button.Group space={2}>
                     <Button
                        variant="ghost"
                        colorScheme="blueGray"
                        onPress={() => {
                           setShowModal(false);
                        }}
                     >
                        Cancel
                     </Button>
                     <Button
                        onPress={() => {
                           setShowModal(false);
                           navigation.navigate("Fvote");
                        }}
                     >
                        Vote
                     </Button>
                  </Button.Group>
               </Modal.Footer>
            </Modal.Content>
         </Modal>
      </NativeBaseProvider>
   );
}

function Vote(props) {
   const [showModal, setShowModal] = useState(false);

   return (
      <NativeBaseProvider>
         <VStack h="full" justifyContent="center" alignItems="center">
            <Box
               maxW="80"
               rounded="lg"
               overflow="hidden"
               borderColor="coolGray.200"
               borderWidth="1"
               _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700",
               }}
               _web={{
                  shadow: 2,
                  borderWidth: 0,
               }}
               _light={{
                  backgroundColor: "gray.50",
               }}
            >
               <Box>
                  <AspectRatio w="100%" ratio={4 / 5}>
                     <Image
                        source={{
                           uri: props.image,
                        }}
                        alt="image"
                     />
                  </AspectRatio>
                  <Center
                     bg="violet.500"
                     _dark={{
                        bg: "violet.400",
                     }}
                     _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs",
                     }}
                     position="absolute"
                     bottom="0"
                     px="3"
                     py="1.5"
                  >
                     PHOTO
                  </Center>
               </Box>
               <Stack p="4" space={3}>
                  <Stack space={2}>
                     <Heading size="md" ml="-1">
                        {props.name}
                     </Heading>
                     <Text
                        fontSize="xs"
                        _light={{
                           color: "violet.500",
                        }}
                        _dark={{
                           color: "violet.400",
                        }}
                        fontWeight="500"
                        ml="-0.5"
                        mt="-1"
                     >
                        {props.role}
                     </Text>
                  </Stack>
                  <Text fontWeight="400">{props.desc}</Text>
                  <HStack
                     alignItems="center"
                     space={4}
                     justifyContent="space-between"
                  >
                     <HStack alignItems="center">
                        <Button
                           size="lg"
                           colorScheme="teal"
                           onPress={() => setShowModal(true)}
                        >
                           Vote
                        </Button>
                     </HStack>
                  </HStack>
               </Stack>
            </Box>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
               <Modal.Content maxWidth="400px">
                  <Modal.CloseButton />
                  <Modal.Header>Confirm Vote</Modal.Header>
                  <Modal.Body>
                     <Text>{props.name}</Text>
                  </Modal.Body>
                  <Modal.Footer>
                     <Button.Group space={2}>
                        <Button
                           variant="ghost"
                           colorScheme="blueGray"
                           onPress={() => {
                              setShowModal(false);
                           }}
                        >
                           Cancel
                        </Button>
                        <Button
                           onPress={() => {
                              setShowModal(false);
                              props.navigation.navigate("Nfinal");
                           }}
                        >
                           Vote
                        </Button>
                     </Button.Group>
                  </Modal.Footer>
               </Modal.Content>
            </Modal>
         </VStack>
      </NativeBaseProvider>
   );
}

function Fvote({ navigation }) {
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

function Nfinal({ navigation }) {
   return (
      <NativeBaseProvider>
         <VStack p="5" pb="10" h="full" justifyContent="flex-end">
            <Image
               size="200"
               resizeMode="cover"
               my="2"
               source={{
                  uri: "https://firebasestorage.googleapis.com/v0/b/tikka-1f350.appspot.com/o/icons%2Fdevelopment.png?alt=media&token=2ea6007d-bc2d-41e8-b839-fdf78feb74ec",
               }}
               alignSelf="center"
               mb="20"
               alt="logo"
            />
            <Text mb="11" fontWeight="bold">
               Choice Coin Voting
            </Text>

            <Text fontSize="10" mb="30" color="green.300">
               Success
            </Text>
            <Text mb="130">Verify the Authencity of your decision.</Text>
            <Button
               variant="link"
               size="lg"
               colorScheme="dark"
               my="5"
               onPress={() => navigation.navigate(Home)}
            >
               Verify now
            </Button>
            <Button
               size="lg"
               colorScheme="teal"
               onPress={() => navigation.navigate(Home)}
            >
               Home
            </Button>
         </VStack>
      </NativeBaseProvider>
   );
}

const Stacknav = createNativeStackNavigator();

export default function App() {
   return (
      <NavigationContainer>
         <Stacknav.Navigator
            screenOptions={{
               headerShown: false,
            }}
         >
            <Stacknav.Screen name="Home" component={Home} />
            <Stacknav.Screen name="Fvote" component={Fvote} />
            <Stacknav.Screen name="Nfinal" component={Nfinal} />
         </Stacknav.Navigator>
      </NavigationContainer>
   );
}
