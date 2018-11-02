import { Injectable } from '@angular/core';

@Injectable()
export class DevicelistService {

  VITAL_TYPE_NONE = -5000;
	VITAL_TYPE_SPO2 = 1;
	VITAL_TYPE_WEIGHT = 2;
	VITAL_TYPE_BP = 4;
	VITAL_TYPE_ECG = 5;
	VITAL_TYPE_PKFLOW = 6;
	VITAL_TYPE_SUGAR = 7;
	VITAL_TYPE_TEMP = 8;


  constructor() {
    
  }


  public getPairingPinFor(devBtName) {
    if(devBtName.includes("Nonin_Medical_Inc")) {
      return devBtName.split("Nonin_Medical_Inc._")[1];
    }
    return "-";
  }


  getBase64(img_src) {
    return "";
  }

  // DEVICE INFO JSONs

  // NONIN  
  noninDeviceInfo = {

      di_device_comm: {
        comm_type: "BT_SPP",

        di_comm_info: {
          bt_name: "Nonin_Medical_Inc",
          di_pairing_info: {
            pairing_needed: true,
            pin: "suffixOf:Nonin_Medical_Inc._",
            di_pairing_instruction: {
              //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=12",
              img_src: "assets/img/devices/12/devicePicture.jpg",
              text: "Place your finger in the oximeter to make it discoverable."
            }
          }
        }
      },
      device_id: "12",
      //device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=12",
      device_img_src: "assets/img/devices/12/devicePicture.jpg",
      di_device_manufacturer: {
        manufacturer_id: "3",
        manufacturer_name: "Nonin"
      },
      device_model_number: "Nonin Onyx II 9560",
      di_usage_instruction_set: [
        {
          di_usage_instruction: {
            at: "WAITING_FOR_CONNECTION",
            ref_num: 101,
            text: "Place your finger inside the oximeter.",
            voice: "please place your finger inside the oxymeter device.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=12&inst_num=1"
            img_src: "assets/img/devices/12/inst_1.png"
          }
        },
        {
          di_usage_instruction: {
            at: "CONNECTED",
            ref_num: 102,
            text: "Connected. Please stay still.",
            voice: "Connected. Please stay still.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=12&inst_num=2"
            img_src: "assets/img/devices/12/inst_2.png"
          }
        },
        {
          di_usage_instruction: {
            at: "FINISHED",
            ref_num: 102,
            text: "Thank You. You may now remove your finger.",
            voice: "Thank You. You may now remove your finger from the oxymeter device.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=12&inst_num=3"
            img_src: "assets/img/devices/12/inst_3.png"
          }
        }
      ]
    } // end-dev-nonin-spo2



    /// pyle weighing scale

    pyleWeighingScaleDeviceInfo = {

      di_device_comm: {
        comm_type: "BT_LE",
        di_comm_info: {
          bt_name: "Samico Scales",
          di_pairing_info: {
            pairing_needed: false,
            pin: "-",
            di_pairing_instruction: {
              img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=30",
              text: "Please tap the scale to turn LED screen on and make it discoverable"
            }
          }
        }
      },
      device_id: "30",
      device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=30",
      di_device_manufacturer: {
        manufacturer_id: "3",
        manufacturer_name: "Pyle Audio"
      },
      device_model_number: "Pyle PHLSCBT4WT",
      di_usage_instruction_set: [
        {
          di_usage_instruction: {
            at: "WAITING_FOR_CONNECTION",
            ref_num: 101,
            text: "Place scale on hard surface. Step on scale. Stay still.",
            voice: "Place the scale on a hard surface. Then step on the scale. and stay still.",
            img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=30&inst_num=1"
          }
        },
        {
          di_usage_instruction: {
            at: "CONNECTED",
            ref_num: 102,
            text: "Connected. Please stay still.",
            voice: "Connected. Please stay still.",
            img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=30&inst_num=2"
          }
        },
        {
          di_usage_instruction: {
            at: "FINISHED",
            ref_num: 102,
            text: "Thank You. Step down from scale.",
            voice: "You may now step down from the scale.",
            img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=30&inst_num=3"
          }
        }
      ]
    } // end pyle wt



    pyleBloodPressureDeviceInfo = {

      di_device_comm: {
        comm_type: "BT_LE",
        di_comm_info: {
          bt_name: "Samico BP",
          di_pairing_info: {
            pairing_needed: false,
            pin: "none",
            di_pairing_instruction: {
              img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=28",
              text: "Place arm in cuff. Press the power button. Wait till device found."
            }
          }
        }
      },
      device_id: "30",
      device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=28",
      di_device_manufacturer: {
        manufacturer_id: "3",
        manufacturer_name: "Pyle Audio"
      },
      device_model_number: "Pyle PHBPB20",
      di_usage_instruction_set: [
        {
          di_usage_instruction: {
            at: "WAITING_FOR_CONNECTION",
            ref_num: 101,
            text: "Place arm in cuff. Press the power button. Then stay still.",
            voice: "Please place your arm in the cuff. Then press the power button. Then stay still.",
            img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=28&inst_num=1"
          }
        },
        {
          di_usage_instruction: {
            at: "CONNECTED",
            ref_num: 102,
            text: "Connected. Please stay still.",
            voice: "Connected. Please stay still.",
            img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=28&inst_num=2"
          }
        },
        {
          di_usage_instruction: {
            at: "FINISHED",
            ref_num: 102,
            text: "Finished. Remove arm from cuff.",
            voice: "Thank you. You may now remove your arm from the cuff.",
            img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=28&inst_num=3"
          }
        }
      ]
    } // end pyle bp 



    foraSugarTestNGoDeviceInfo = {

      di_device_comm: {
        comm_type: "BT_SPP",

        di_comm_info: {
          bt_name: "TEST-N-GO",
          di_pairing_info: {
            pairing_needed:true,
            pin: "none",
            di_pairing_instruction: {
              //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=31",
              img_src: "assets/img/devices/31/devicePicture.jpg",
              text: "With device turned off, press rear button 12 times in hole till 'PAr'. Then press front button to 'yes'. Then press rear button to start pairing mode."
            }
          }
        }
      },
      device_id: "30",
      //device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=31",
      device_img_src: "assets/img/devices/31/devicePicture.jpg",
      di_device_manufacturer: {
        manufacturer_id: "3",
        manufacturer_name: "Fare Care"
      },
      device_model_number: "Test N'Go",
      di_usage_instruction_set: [
        {
          di_usage_instruction: {
            at: "WAITING_FOR_CONNECTION",
            ref_num: 101,
            text: "Place empty strip in device. Wait for drop symbol. Fill strip with blood. Remove Strip when reading is completed.",
            voice: "Place empty strip in device. Wait for drop symbol. Fill strip with blood. Remove Strip when reading is completed.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=31&inst_num=1"
            img_src: "assets/img/devices/31/inst_1.png"
          }
        },
        {
          di_usage_instruction: {
            at: "CONNECTED",
            ref_num: 102,
            text: "Connected.",
            voice: "Connected.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=31&inst_num=2"
            img_src: "assets/img/devices/31/inst_2.png"
          }
        },
        {
          di_usage_instruction: {
            at: "FINISHED",
            ref_num: 102,
            text: "Thank You. Please clean the device.",
            voice: "Thank You. Please clean the device.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=31&inst_num=3"
            img_src: "assets/img/devices/31/inst_3.png"
          }
        }
      ]
    }



    // FORA BP-SUGAR D30F
    foraD30fBpSugarDeviceInfo = {

      di_device_comm: {
        comm_type: "BT_SPP",
        di_comm_info: {
          bt_name: "TaiDoc-Device",
          di_pairing_info: {
            pairing_needed: false,
            pin: "111111",
            di_pairing_instruction: {
              img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=22",
              text: "Press the Back Button to turn on pairing."
            }
          }
        }
      },
      device_id: "22",
      device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=22",
      di_device_manufacturer: {
        manufacturer_id: "3",
        manufacturer_name: "Fora Care"
      },
      device_model_number: "Fora D30f",
      di_usage_instruction_set: [
        {
          di_usage_instruction: {
            at: "WAITING_FOR_CONNECTION",
            ref_num: 101,
            text: "Place arm in cuff. Press the power button. Then stay still.",
            voice: "Please place your arm in the cuff. Then press the power button. Then stay still.",
            img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=22&inst_num=1"
          }
        },
        {
          di_usage_instruction: {
            at: "CONNECTED",
            ref_num: 102,
            text: "Connected. Please stay still.",
            voice: "Connected. Please stay still.",
            img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=22&inst_num=2"
          }
        },
        {
          di_usage_instruction: {
            at: "FINISHED",
            ref_num: 102,
            text: "Finished. Remove arm from cuff.",
            voice: "Thank you. You may now remove your arm from the cuff.",
            img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=22&inst_num=3"
          }
        }
      ]
    } // end fora bp d30f






    // Blood Pressure AND UE 651 BLE
    andBpUa651DeviceInfo = {

      di_device_comm: {
        comm_type: "BT_LE",
        di_comm_info: {
          bt_name: "A&D_UA-651BLE",
          di_pairing_info: {
            pairing_needed: true,
            pin: "-",
            di_pairing_instruction: {
              //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=34",
              img_src: "assets/img/devices/34/devicePicture.jpg",
              text: "Press and hold the power button till 'Pr' appears on the meter."
            }
          }
        }
      },
      device_id: "34",
      device_img_src: "assets/img/devices/34/devicePicture.jpg",
      di_device_manufacturer: {
        manufacturer_id: "3",
        manufacturer_name: "A&D"
      },
      device_model_number: "A&D UA-651BLE",
      di_usage_instruction_set: [
        {
          di_usage_instruction: {
            at: "WAITING_FOR_CONNECTION",
            ref_num: 101,
            text: "Place arm in cuff. Press the power button. Then stay still.",
            voice: "Please place your arm in the cuff. Then press the power button. Then stay still.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=34&inst_num=1"
            img_src: "assets/img/devices/34/inst_1.png"
          }
        },
        {
          di_usage_instruction: {
            at: "CONNECTED",
            ref_num: 102,
            text: "Connected.",
            voice: "Connected.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=34&inst_num=2"
            img_src: "assets/img/devices/34/inst_2.png"
          }
        },
        {
          di_usage_instruction: {
            at: "FINISHED",
            ref_num: 102,
            text: "Finished. Remove arm from cuff.",
            voice: "Thank you. You may now remove your arm from the cuff.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=34&inst_num=3"
            img_src: "assets/img/devices/34/inst_3.png"
          }
        }
      ]
    } // end AND BP UA-651BLE






    // FAROS 360 ECG 
    faros360EcgDeviceInfo = {

      di_device_comm: {
        comm_type: "BT_SPP",
        di_comm_info: {
          bt_name: "FAROS",
          di_pairing_info: {
            pairing_needed: false,
            pin: "-",
            di_pairing_instruction: {
              //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=33",
              img_src:"assets/img/devices/33/devicePicture.jpg",
              text: "Press the Main Button to turn on pairing."
            }
          }
        }
      },
      device_id: "33",
      //device_img_src: "http://devices.hygeatel.info/index.php/Admin/getDevicePicture?dev_id=33",
      device_img_src: "assets/img/devices/33/devicePicture.jpg",
      di_device_manufacturer: {
        manufacturer_id: "3",
        manufacturer_name: "Faros"
      },
      device_model_number: "Faros 360",
      di_usage_instruction_set: [
        {
          di_usage_instruction: {
            at: "WAITING_FOR_CONNECTION",
            ref_num: 101,
            text: "Please place the leads as shown in the figure",
            voice: "Please place the leads as shown in the figure",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=33&inst_num=1"
            img_src: "assets/img/devices/33/inst_1.png"
          }
        },
        {
          di_usage_instruction: {
            at: "CONNECTED",
            ref_num: 102,
            text: "Connected. Please stay still.",
            voice: "Connected. Please stay still.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=33&inst_num=2"
            img_src: "assets/img/devices/33/inst_2.png"
          }
        },
        {
          di_usage_instruction: {
            at: "FINISHED",
            ref_num: 102,
            text: "You may remove the leads. Place device for charging.",
            voice: "Thank you. You may remove the leads. Place device for charging.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=33&inst_num=3"
            img_src: "assets/img/devices/33/inst_3.png"
          }
        }
      ]
    } // end FAROS 360





    // Weght A&D UC-352BLE
    andWeightUa651DeviceInfo = {

      di_device_comm: {
        comm_type: "BT_LE",
        di_comm_info: {
          bt_name: "A&D_UC-352BLE",
          di_pairing_info: {
            pairing_needed: true,
            pin: "-",
            di_pairing_instruction: {
              //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=34",
              img_src: "assets/img/devices/40/pairingInstruction.jpg",
              text: "Press and hold the SET button behind the scale till 'Pr' appears on the meter."
            }
          }
        }
      },
      device_id: "40",
      device_img_src: "assets/img/devices/40/devicePicture.jpg",
      di_device_manufacturer: {
        manufacturer_id: "3",
        manufacturer_name: "A&D"
      },
      device_model_number: "A&D UC-352BLE",
      di_usage_instruction_set: [
        {
          di_usage_instruction: {
            at: "WAITING_FOR_CONNECTION",
            ref_num: 101,
            text: "Step on scale till you hear three beeps to step off.",
            voice: "Step on the scale and stay still. When you hear three beeps, step off.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=1"
            img_src: "assets/img/devices/40/inst_1.gif"
          }
        },
        {
          di_usage_instruction: {
            at: "CONNECTED",
            ref_num: 102,
            text: "Connected.",
            voice: "Connected.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=2"
            img_src: "assets/img/devices/40/inst_2.jpg"
          }
        },
        {
          di_usage_instruction: {
            at: "FINISHED",
            ref_num: 102,
            text: "Finished.",
            voice: "Thank you.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=3"
            img_src: "assets/img/devices/40/inst_3.jpg"
          }
        }
      ]
    } // end AND BP UA-651BLE




    // Innovo oximeter
    innovoSpo2BluetoothDeviceInfo = {

      di_device_comm: {
        comm_type: "BT_LE",
        di_comm_info: {
          bt_name: "My Oximeter",
          di_pairing_info: {
            pairing_needed: false,
            pin: "-",
            di_pairing_instruction: {
              //img_src: "http://devices.hygeatel.info/index.php/Admin/getPairingInstructionImage?dev_id=34",
              img_src: "assets/img/devices/50/pairingInstruction.jpg",
              text: "Press the power button and place finger inside oximeter to make device discoverable."
            }
          }
        }
      },
      device_id: "50",
      device_img_src: "assets/img/devices/50/devicePicture.jpg",
      di_device_manufacturer: {
        manufacturer_id: "3",
        manufacturer_name: "Innovo"
      },
      device_model_number: "Bluetooth Oximeter",
      di_usage_instruction_set: [
        {
          di_usage_instruction: {
            at: "WAITING_FOR_CONNECTION",
            ref_num: 101,
            text: "Press Power Button. Place Finger inside oximeter and stay still.",
            voice: "Press the power button and place your finger inside oximeter and stay still.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=1"
            img_src: "assets/img/devices/50/inst_1.jpg"
          }
        }, 
        {
          di_usage_instruction: {
            at: "CONNECTED",
            ref_num: 102,
            text: "Connected.",
            voice: "Connected.",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=2"
            img_src: "assets/img/devices/50/inst_2.jpg"
          }
        },
        {
          di_usage_instruction: {
            at: "FINISHED",
            ref_num: 102,
            text: "Remove finger from the oximeter device",
            voice: "Thank you. You may now remove your finger from the oximeter device",
            //img_src: "http://devices.hygeatel.info/index.php/Admin/getInstructionImage?dev_id=40&inst_num=3"
            img_src: "assets/img/devices/50/inst_3.jpg"
          }
        }
      ]
    } // end Innovo oximeter

}

