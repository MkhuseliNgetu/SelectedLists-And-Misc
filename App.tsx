import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

//Only 1 per application
const Stack = createNativeStackNavigator()

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Image-Page'>
        <Stack.Screen name='Landing-Page' component={Landing} />
        <Stack.Screen name='Home-Page' component={Home} />
        <Stack.Screen name= 'Image-Page' component={Images} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}



// First Page we see upon launching the application
function Landing({navigation}){

  const [DecryptApp, setPassword] = useState('') 
  const [HasMyStyleChanged, isStyleChanged] = useState(false)

  //Props is very similar to a method - try and use it to split up your internal processing and call when needed within the return section of the app.
  //Preferably use them only with a touchable opacity (buttons)
  //This example prop changes the a single variable.
  const HandleStyleChanges = () =>{
     
    switch(HasMyStyleChanged){

      case true:
        isStyleChanged(true)
        break
      case false:
        isStyleChanged(false)
      default:
        isStyleChanged(true)
      break; 

     }

  }

  return(
    <SafeAreaView>
      <ScrollView>
        <View style={HasMyStyleChanged ? styles.default_dark_mode: styles.default_light_mode}>
          <Text> Enter a password to proceed</Text>
          <StatusBar style="auto" />
       
            {/* This is where my inputs will be handled */}
            {/* <View>
              <TextInput keyboardType="default" onChangeText={(DecryptApp) => setPassword(DecryptApp)} />
            </View> */}
            {/* This is where my buttons will be handled */}
            <View>
            <TouchableOpacity onPress={() => navigation.navigate("Landing-Page", {decryptionKey: DecryptApp, styleKey: HasMyStyleChanged})}>
              <Text> Dive Into App!</Text>
            </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

//This is the page we see after unlocking the application
function Home({navigation, route}){

    const KeyToApplication = route.params?.decryptionKey;
    const StyleStatus = route.params?.styleKey

    return(
      <SafeAreaView>
        <ScrollView>
          <View style={ StyleStatus ? styles.default_light_mode : styles.default_dark_mode}>
              <Text>Welcome to the home page</Text>
              <StatusBar style="auto" />
   
                {/*  */}
                <View>
                  <Text>To find and display a picture, tap on the button below</Text>
                </View>
                {/*  */}
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate("Image-Page")}>
                    <Text> Dive Into App!</Text>
                  </TouchableOpacity>
                </View>
          </View>
        </ScrollView>
      </SafeAreaView>
  )
}

function Images(){


  //Populating the select parallel arrays with values
  const [ImagePaths, setImagePath] = useState(["./assets/Recommended Access Controls (V4).png",
                                             "./assets/RQ1 - Chart (V2).png",
                                            "./assets/RQ2 - Chart (V2).png",
                                          "./assets/RQ3 - Chart (V2).png"])

  const [ImageNames, setImageNames] = useState(["Recommended Access Controls (V4)",
                                             "RQ1 - Chart (V2)",
                                            "RQ2 - Chart (V2)",
                                          "RQ3 - Chart (V2)"])

  const [SelectedImage, setSelectedImage] = useState('')

  return(
    <SafeAreaView>
    <ScrollView>
      <View style={styles.default_light_mode}>

          <View style={styles.default_layout}>
            <Text>Select a image location</Text>
          </View>

          <View style={styles.default_layout}>
              <SelectList search={false} setSelected={(SelectedImage: string) => setSelectedImage(SelectedImage)} data={ImageNames}   />
          </View>

          <View style={styles.default_layout}>
           <Text>{SelectedImage ? SelectedImage: "Please Select a value from the drop down list"}</Text>
          </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  default_layout: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Theme Changes for the entire page
  default_light_mode: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  default_dark_mode: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  // Theme Changes for text labels onlu
  default_label_light_mode: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  default_label_dark_mode: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  }
});
