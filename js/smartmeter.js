var connection_status= false;

function BtnConnect(){
  
    clientID = document.getElementById("box_clientID").value;
    host = 'df9c9c89.us-east-1.emqx.cloud';
    port = 8084;

    // Create a client instance
    // client = new Paho.MQTT.Client('e8f424ec.emqx.cloud', 8083, "test");
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
    onSuccess: onConnect,
    // onFailure: onFailure,
    useSSL: true,

    userName: 'IMPROTECH',
    password: 'improtech2024',
    mqttVersion:4
});
}


// called when the client connects
function onConnect() {

  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  connection_status = true ;
  // alert("Connect to server is success.")

  const textBox = document.getElementById('box_clientID');
  const connectButton = document.getElementById('btn_connect');
  connectButton.disabled = true;
  setTimeout(() => {
    // console.log('Connection successful!');

     // Clear the text box after connection
     textBox.value = '';
     textBox.disabled = true;
     textBox.style.backgroundColor ='greenyellow';

    // Disable the button once connected
    connectButton.disabled = true;
    connectButton.textContent = 'CONNECTED';
    connectButton.style.Color = 'red';

  }, 2000);


  const subTopic1 = 'controller1_data' ;
  const subTopic2 = 'controller1_con_status' ;
  // subTopic5= 'alert' ;
  qos = 0;
  client.subscribe(subTopic1);
  client.subscribe(subTopic2);

  document.getElementById('electrical1_button').disabled = false;
  document.getElementById('electrical2_button').disabled = false;
  document.getElementById('electrical3_button').disabled = false;
  document.getElementById('water1_button').disabled = false;
  document.getElementById('water2_button').disabled = false;
  document.getElementById('water3_button').disabled = false;
}
  
  
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+ responseObject.errorMessage);
    alert("MQTT Connection Lost");
  }
}


  
// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
    
    // Split the string into an array using comma as the delimiter
    const values = message.payloadString.split(',');

    // Display Custormer 1
    if (values[0]=='data'&&values[1]=='c1'){
      document.getElementById('box_cus_power1').value = values[1] || '';
      document.getElementById('box_cus_voltage1').value = values[2] || '';
      document.getElementById('box_cus_current1').value = values[3] || '';
      document.getElementById('box_cus_water1').value = values[4] || '';
    }
    
    // Display Custormer 2
    else if (values[0]=='data'&&values[5]=='c2'){
      document.getElementById('box_cus_power2').value = values[6] || '';
      document.getElementById('box_cus_voltage2').value = values[7] || '';
      document.getElementById('box_cus_current2').value = values[8] || '';
      document.getElementById('box_cus_water2').value = values[9] || '';
    }

    // Display Custormer 3
    else if (values[0]=='data'&&values[10]=='c3'){
      document.getElementById('box_cus_power3').value = values[11] || '';
      document.getElementById('box_cus_voltage3').value = values[12] || '';
      document.getElementById('box_cus_current3').value = values[13] || '';
      document.getElementById('box_cus_water3').value = values[14] || '';
    }

    // Total Energy
    document.getElementById('box_energy').value = Number(values[1])+Number(values[6])+Number(values[11]);

    // Total Water
    document.getElementById('box_water').value = Number(values[4])+Number(values[9])+Number(values[14]);
    

    // -----------Status---------

    // Electrical1
    if (values[0]=='status'&&values[1]=='c1'&&values[2]=='1'){
      electric_status = document.getElementById('electrical1_button');
      electric_status.textContent ='ON';
      electric_status.disabled = false;
    }
    if (values[0]=='status'&&values[1]=='c1'&&values[2]=='0'){
      electric_status = document.getElementById('electrical1_button');
      electric_status.textContent ='OFF';
      electric_status.disabled = false;
    }
    // Water1
    if (values[0]=='status'&&values[1]=='c1'&&values[3]=='1'){
      water_status = document.getElementById('water1_button');
      water_status.textContent ='ON';
      water_status.disabled = false;
    }
    if (values[0]=='status'&&values[1]=='c1'&&values[3]=='0'){
      water_status = document.getElementById('water1_button');
      water_status.textContent ='OFF';
      water_status.disabled = false;
    }

    // Electrical2
    if (values[0]=='status'&&values[4]=='c2'&&values[5]=='1'){
      electric_status = document.getElementById('electrical2_button');
      electric_status.textContent ='ON';
      electric_status.disabled = false;
    }
    if (values[0]=='status'&&values[4]=='c2'&&values[5]=='0'){
      electric_status = document.getElementById('electrical2_button');
      electric_status.textContent ='OFF';
      electric_status.disabled = false;
    }
    // Water2
    if (values[0]=='status'&&values[4]=='c2'&&values[6]=='1'){
      water_status = document.getElementById('water2_button');
      water_status.textContent ='ON';
      water_status.disabled = false;
    }
    if (values[0]=='status'&&values[4]=='c2'&&values[6]=='0'){
      water_status = document.getElementById('water2_button');
      water_status.textContent ='OFF';
      water_status.disabled = false;
    }

    // Electrical3
    if (values[0]=='status'&&values[7]=='c3'&&values[8]=='1'){
      electric_status = document.getElementById('electrical3_button');
      electric_status.textContent ='ON';
      electric_status.disabled = false;
    }
    if (values[0]=='status'&&values[7]=='c3'&&values[8]=='0'){
      electric_status = document.getElementById('electrical3_button');
      electric_status.textContent ='OFF';
      electric_status.disabled = false;
    }
    // Water3
    if (values[0]=='status'&&values[7]=='c3'&&values[9]=='1'){
      water_status = document.getElementById('water3_button');
      water_status.textContent ='ON';
      water_status.disabled = false;
    }
    if (values[0]=='status'&&values[7]=='c3'&&values[9]=='0'){
      water_status = document.getElementById('water3_button');
      water_status.textContent ='OFF';
      water_status.disabled = false;
    }
}


const buttonStates = {
  button1: false,
  button2: false,
  button3: false,
  button4: false,
  button5: false,
  button6: false,
};


// customer 1
function toggleState1(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton1 = document.getElementById('electrical1_button');

  if(toggleButton1){
    toggleButton1.disabled = true;
    // toggleButton1.textContent = 'OFF';
  }
}
function toggleState2(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton2 = document.getElementById('water1_button');

  if(toggleButton2){
    toggleButton2.disabled = true;
    // toggleButton2.textContent = 'OFF';
  }
}
// customer 2
function toggleState3(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton1 = document.getElementById('electrical2_button');

  if(toggleButton1){
    toggleButton1.disabled = true;
    // toggleButton1.textContent = 'OFF';
  }
}
function toggleState4(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton2 = document.getElementById('water2_button');

  if(toggleButton2){
    toggleButton2.disabled = true;
    // toggleButton2.textContent = 'OFF';
  }
}
// customer 3
function toggleState5(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton1 = document.getElementById('electrical3_button');

  if(toggleButton1){
    toggleButton1.disabled = true;
    // toggleButton1.textContent = 'OFF';
  }
}

function toggleState6(buttonId) {
  buttonStates[buttonId] = !buttonStates[buttonId];
  publishData();

  toggleButton2 = document.getElementById('water3_button');
  if(toggleButton2){
    toggleButton2.disabled = true;
    // toggleButton2.textContent = 'OFF';
  }
}





// PUBLISH DATA
function publishData() {
  const message = `pub,c1,${buttonStates.button1 ? '1' : '0'},${buttonStates.button2 ? '1' : '0'},c2,${buttonStates.button3 ? '1' : '0'},${buttonStates.button4 ? '1' : '0'},c3,${buttonStates.button5 ? '1' : '0'},${buttonStates.button6 ? '1' : '0'}`;                
  client.send('controller1_con_pub', message);
  console.log('Published customer:', message);
}


  