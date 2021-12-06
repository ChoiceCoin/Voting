import React from "react";
import { Image, NativeBaseProvider, Button, VStack, Text } from "native-base";
import { Modal } from "native-base";
import { useState } from "react";
import { FormControl, Input, Center } from "native-base";


export function Home({ navigation }) {
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
 