import React from "react";
import {HStack, NativeBaseProvider, Button, VStack, Text, Avatar, ScrollView} from "native-base";
import { Icon } from 'native-base';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

// Use ReactNative Linking for linking to websites
// Convert to components ;-)


export  function ViewCandidates({ navigation }){


    return(
        <NativeBaseProvider>
            <ScrollView bg={'light.100'}>
        <VStack bg={'light.100'} pt={10}>
            <Button variant={'link'} onPress={()=>{
                navigation.navigate("Home")
            }}>
                Go Back
            </Button>
            <VStack shadow={2} bg={'blue.100'} justifyContent={'center'} alignItems={'center'} p={5} space={4} m={5} rounded={'md'}>
                <Avatar borderWidth={3}  source={{uri:'http://xekhai.com.ng/ccui/CCUI/assets/images/team1.jpg'}} size={'2xl'}>PP</Avatar>
                <VStack w={'100%'}>
                    <Text fontWeight={'bold'} alignSelf={'center'}>
                        John Smith
                    </Text>
                    <Text alignSelf={'center'}>
                        Programmer
                    </Text>
                </VStack>
                <HStack space={4}>
                    <Icon as={Ionicons} name="logo-facebook" />
                    <Icon as={Ionicons} name="logo-github" />
                    <Icon as={Ionicons} name="information-circle" />
                </HStack>
            </VStack>
            <VStack shadow={2} bg={'red.100'} justifyContent={'center'} alignItems={'center'} p={5} space={4} m={5} rounded={'md'}>
                <Avatar borderWidth={3}  source={{uri:'http://xekhai.com.ng/ccui/CCUI/assets/images/team2.jpg'}} size={'2xl'}>PP</Avatar>
                <VStack w={'100%'}>
                    <Text alignSelf={'center'}>
                        Sarah Palmer
                    </Text>
                    <Text alignSelf={'center'}>
                        Manager
                    </Text>
                </VStack>
                <HStack space={4}>
                    <Icon as={Ionicons} name="logo-facebook" />
                    <Icon as={Ionicons} name="logo-github" />
                    <Icon as={Ionicons} name="information-circle" />
                </HStack>
            </VStack>
            <VStack shadow={2} bg={'yellow.100'} justifyContent={'center'} alignItems={'center'} p={5} space={4} m={5} rounded={'md'}>
                <Avatar borderWidth={3}  source={{uri:'http://xekhai.com.ng/ccui/CCUI/assets/images/team3.jpg'}} size={'2xl'}>PP</Avatar>
                <VStack w={'100%'}>
                    <Text alignSelf={'center'}>
                        Jessica Swift
                    </Text>
                    <Text alignSelf={'center'}>
                        Analyst
                    </Text>
                </VStack>
                <HStack space={4}>
                    <Icon as={Ionicons} name="logo-facebook" />
                    <Icon as={Ionicons} name="logo-github" />
                    <Icon as={Ionicons} name="information-circle" />
                </HStack>
            </VStack>
        </VStack>
            </ScrollView>
        </NativeBaseProvider>
    )
}