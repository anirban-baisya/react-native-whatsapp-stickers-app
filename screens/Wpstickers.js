import React, { useEffect, useState } from 'react'
import { Alert, Button, Platform, Text, View, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native'
import RNWhatsAppStickers from 'react-native-whatsapp-stickers'
import Modal from "react-native-modal";
import {EMOJIS} from '../config/stickerConfig';


function Wpstickers() {
    const [showPicker_1, setShowPicker_1] = useState(false);

    const firstopenPicker = () => {
        setShowPicker_1(true);
    }

    const config = {
        identifier: 'myprojectstickers',
        name: 'MyProject Stickers',
        publisher: 'John Doe',
        trayImageFileName: 'tray_Cuppy.png',
        publisherEmail: 'xyz@myproject.xy',
        publisherWebsite: 'https://github.com/Jobeso/react-native-whatsapp-stickers',
        privacyPolicyWebsite:
            'https://github.com/Jobeso/react-native-whatsapp-stickers',
        licenseAgreementWebsite:
            'https://github.com/Jobeso/react-native-whatsapp-stickers/blob/master/LICENSE',
        stickers: [
            {
                fileName: '01_Cuppy_smile.webp',
                emojis: ['☕', '🙂'],
            },
            {
                fileName: '02_Cuppy_lol.webp',
                emojis: ['😄', '😀'],
            },
            {
                fileName: '03_Cuppy_rofl.webp',
                emojis: ['😆', '😂'],
            },
        ],
    }

    const { stickers, ...packConfig } = config
    const [isAvailable, setIsAvailable] = useState(false)
    useEffect(() => {
        RNWhatsAppStickers.isWhatsAppAvailable()
            .then(() => setIsAvailable(true))
            .catch(logError)
    }, [])
    const logError = e => {
        console.log(e)
        Alert.alert('Error', e.message)
    }
    const sendStickerPack = () => {
        if (Platform.OS === 'ios') {
            RNWhatsAppStickers.createStickerPack(packConfig)
                .then(() => {
                    const promises = stickers.map(item =>
                        RNWhatsAppStickers.addSticker(item.fileName, item.emojis)
                    )
                    Promise.all(promises).then(() => RNWhatsAppStickers.send())
                })
                .catch(logError)
        } else {
            RNWhatsAppStickers.send('myprojectstickers', 'MyProject Stickers')
                .then((res) => console.log('success', res))
                .catch(logError)
        }
    }



    const Sticker = ({ image}) => (
		<Pressable
			style={{
				padding: '2%',
				marginBottom: 15,
				borderRadius: 12,
				width: 100,
				height: 100,
				backgroundColor: '#fff',
			}}
			
            >
			<Image
				source={{uri: image}}
				style={{width: '100%', height: '100%', borderRadius: 12}}
			/>
		</Pressable>
	);

    return (

        <View style={{ flex: 1 }}>

            <TouchableOpacity
                onPress={() => firstopenPicker()}
                style={{ height: 35, borderWidth: 1, borderRadius: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'purple' }}
            >
                <Text style={{ color: '#fff' }}>ADD TO WhatsApp</Text>
            </TouchableOpacity>


            {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 48 }}>
                    RNWhatsAppStickers
                </Text>
                <Text style={{ marginBottom: 24, fontSize: 16 }}>
                    WhatsApp is{' '}
                    {isAvailable ? (
                        <Text>available</Text>
                    ) : (
                        <Text>not available</Text>
                    )}
                </Text>
                {isAvailable && (
                    <Button title="Send Stickers" onPress={sendStickerPack} />
                )}
            </View> */}



                <View style={{padding: '5%', }}>
                    <Text style={{fontWeight: "bold",  fontSize: 27, }}>All Emojis 🔥</Text>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexWrap: 'wrap',
                        paddingTop: '10%',
                        flexDirection: 'row',
                        paddingHorizontal: '5%',
                        justifyContent: 'space-around',
                    }}>
                    {EMOJIS.map((emoji, index) => {
                        return (
                            <Sticker key={index} name={Math.random().toString()} image={emoji.url} />
                        );
                    })}
                </ScrollView>





            <Modal
                animationIn="slideInRight"
                animationOut="slideOutRight"
                onBackdropPress={() => setShowPicker_1(false)}
                isVisible={showPicker_1}>
                <View style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 4,
                    borderColor: 'rgba(0, 0, 0, 0.1)', justifyContent: 'center', padding: 15,
                    height: 200
                }}>

                    <View >
                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#000' }}>
                            RNWhatsAppStickers
                        </Text>
                        <Text style={{ marginBottom: 24, fontSize: 16 }}>
                            WhatsApp is{' '}
                            {isAvailable ? (
                                <Text>available</Text>
                            ) : (
                                <Text>not available</Text>
                            )}
                        </Text>
                        {isAvailable && (
                            <Button title="Send Stickers" onPress={sendStickerPack} />
                        )}
                    </View>

                </View>
            </Modal>

        </View>
    )
}

export default Wpstickers;




/*


##### react-native-whatsapp-stickers getting success but not exported to whatsapp or not working properly :-

// https://github.com/Jobeso/react-native-whatsapp-stickers  && follow Android setup structure

1st go to :- node_modules > react-native-whatsapp-stickers > android > src> main > java > com > jobeso > RNWhatsAppStickers >RNWhatsAppStickersModule.java

2nd :- comment out below lines from @ReactMethod public void send(String identifier, String stickerPackName, Promise promise) { ... } section

try {
  Activity activity = getCurrentActivity();
  // ResolveInfo should = activity.getPackageManager().resolveActivity(intent, 0);
  // if (should != null) {
    activity.startActivityForResult(wintent, ADD_PACK);
    promise.resolve("OK");
  // } else {
  //   promise.resolve("OK, but not opened");
  // }
} catch (ActivityNotFoundException e) {
  promise.reject(ERROR_ADDING_STICKER_PACK, e);
} catch  (Exception e){
  promise.reject(ERROR_ADDING_STICKER_PACK, e);
}
*/