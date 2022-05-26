// import { StyleSheet, Text, View, BackHandler, Button } from 'react-native'
// import React, { useState } from 'react'

// import AnimatedSticker from 'react-native-animated-stickers-chz';
// import AnimatedStickerKeyboard from 'react-native-animated-stickers-chz/AnimatedKeyBoard'
// import AnimatedStickerView from 'react-native-animated-stickers-chz/AnimatedStickerView';



// const index = () => {

//     const [vis, setVis] = useState(false)

//     const handleBackButtonClick = async () => {
//         if (vis) {
//             setVis(false)
//         } else {
//             BackHandler.exitApp()
//             //Other think when backPress on invisible keyboard
//             return true
//         }
//     }

//     return (
//         <>

//             {/* MAIN VIEW */}
//             <View>

//                 {/* SECOND VIEW */}
//                 <View>
//                     <Button title='GET STICKER' onPress={() => { setVis(!vis) }} />
//                 </View >

//                 {/* KEYBOARD AFTER SECOND VIEW BOTTOM */}
//                 < AnimatedStickerKeyboard
//                     textButtonColor={'#000'}
//                     infoText={false}
//                     visibility={vis}
//                     onSend={(uri) => { console.log(uri) }}
//                     // keyBoardStyle=
//                     // menuButtonStyle=
//                     onBackPress={() => { handleBackButtonClick() }}
//                     textColor={'black'}
//                     hideDes={false}
//                     hideFooter={true}
//                     placeHolderColor={'#00000010'}
//                 />

//             </View>

//         </>
//     )
// }

// export default index

// const styles = StyleSheet.create({})