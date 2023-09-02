import React from "react";
import {HStack, NativeBaseProvider, Button, VStack, Text, Avatar, ScrollView, Pressable} from "native-base";
import { Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import {TouchableOpacity} from "react-native";

// Use ReactNative Linking for linking to websites
// Convert to components ;-)


export function ViewCandidates({ navigation }){


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

                    <TouchableOpacity onPress={()=>{Linking.openURL('https://facebook.com/anessixDesigns');}}><Icon as={Ionicons} name="logo-facebook" /></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Linking.openURL('https://github.com');}}><Icon as={Ionicons} name="logo-github" /></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Linking.openURL('https://Xekhai.com.ng');}}><Icon as={Ionicons} name="information-circle" /></TouchableOpacity>

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

                    <TouchableOpacity onPress={()=>{Linking.openURL('https://facebook.com/');}}><Icon as={Ionicons} name="logo-facebook" /></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Linking.openURL('https://github.com/Xekhai');}}><Icon as={Ionicons} name="logo-github" /></TouchableOpacity>
                    <TouchableOpacity onPress={()=>{Linking.openURL('https://dribble.com');}}><Icon as={Ionicons} name="information-circle" /></TouchableOpacity>

                </HStack>
            </VStack>
                    </VStack>
            </ScrollView>
        </NativeBaseProvider>
    )
}