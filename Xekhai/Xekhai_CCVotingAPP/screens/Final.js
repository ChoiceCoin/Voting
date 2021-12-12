import React from "react";
import {Image, NativeBaseProvider, Button, VStack, Text, TextArea, ScrollView, KeyboardAvoidingView, useBreakpointValue} from "native-base";
import {Platform} from "react-native";

export function Nfinal({ route, navigation }) {

    console.log(route.params.data)
    return (
       <NativeBaseProvider>

           <ScrollView>
               <KeyboardAvoidingView
                   h={{
                   base: "400px",
                   lg: "auto",
                      }}
                   behavior={Platform.OS === "ios" ? "padding" : "height"}
               >
          <VStack p="5" pb="10" pt='100' h="full" justifyContent="flex-end">
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
             <Text mb="5">Verify the Authencity of your decision.</Text>
              <TextArea>{route.params.data}</TextArea>
             <Button
                variant="link"
                size="lg"
                colorScheme="dark"
                my="5"
                onPress={() => navigation.navigate('Home')}
             >
                Verify now
             </Button>
             <Button
                size="lg"
                colorScheme="teal"
                onPress={() => navigation.navigate('Home')}
             >
                Home
             </Button>
          </VStack>
               </KeyboardAvoidingView>
           </ScrollView>

</NativeBaseProvider>
    );
 }
 