import React from "react";
import { Image, NativeBaseProvider, Button, VStack, Text } from "native-base";
import { Modal } from "native-base";
import { useState } from "react";
import { Center } from "native-base";
import { Box, Heading, AspectRatio, HStack, Stack } from "native-base";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

//heroku api link tested and work so far///////////////////////
const baseUrl = '';
///////////////////////////////////////////////////////////////
//HEROKU BASE URL NOT PURESTAKE!!!!
let roku
async function go(id){

 await  axios({
      method: 'get',
      url: `${baseUrl}/vote?id=${id}`
    }).then((response) => {
      console.log(response.data);

      roku = response.data

    }).finally(console.log('Done'));
   
}
// Passing configuration object to axios


export function Vote(props) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nullStatus, setnullStatus] = useState('null')


    const [isDisabled, setDisabled] = useState(false);

    let HasVoted

    async function getData () {

            const value = await AsyncStorage.getItem('HasVoted')

            if(value !== null) {
                console.log(value)
                setnullStatus(value)
                return(value)
            }else{
                HasVoted = 'null'
                setnullStatus('null')
                console.log(HasVoted)
                return('null')
            }
    }

getData()

console.log(HasVoted)
    if(isDisabled){

    }else{
        if(nullStatus === 'null'){
        }else{
            setDisabled(true)
        }
    }







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
                            isDisabled={isDisabled}
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
                             isLoading={loading}
                             variant="ghost"
                            colorScheme="blueGray"
                            onPress={() => {
                               setShowModal(false);
                            }}
                         >
                            Cancel
                         </Button>
                         <Button
                             isLoading={loading}
                            onPress={() => {
                                setLoading(true)
                               go(props.id).finally((res)=>{
                                   try {
                                    AsyncStorage.setItem('HasVoted', 'yeah')
                                   } catch (e) {
                                       // saving error
                                   }
                                   props.navigation.navigate("Nfinal", {
                                       data: roku
                                   })
                               })
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
 