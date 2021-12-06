import React from "react";
import { Image, NativeBaseProvider, Button, VStack, Text } from "native-base";

export function Nfinal({ navigation }) {
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
       </NativeBaseProvider>
    );
 }
 