# Contacts
Contacts app 

Redux for State management,
React Native, 
superagent-bluebird-promise for rest client


Shows list of contacts: This screen lists all available contacts in the app along with their photo. The contacts are fetched from the backend. Along with the list of contacts, it shows which contacts are marked favourite.
![Alt text](/screenshot/1.png?raw=true "list of contacts")


Contact Detail Screen: Tapping on a contact in the home screen leads you to the Contact Detail screen. This screen shows the details of the contact such as their phone number, name, image, email address etc. You can call, message and email a contact from this screen as well as mark/unmark them as a favourite.
![Alt text](/screenshot/2.png?raw=true "Detail Screen")

Edit Contact Screen: Tapping on the contact button in the Contact Detail screen leads you to this screen. You can edit all fields of the contact in this screen including the contact’s photo. Saving the contact’s information should also save it on the backend.
![Alt text](/screenshot/3.png?raw=true "Edit Contact Screen")


Library Used: 
    "react-native-linear-gradient": "^2.0.0",
    "react-native-root-toast": "^1.0.5",
    "react-native-router-flux": "3.38.0",
    "react-native-vector-icons": "^4.0.1",
    "react-redux": "^5.0.4",
    "redux": "^3.6.0",
    "superagent-bluebird-promise"
    
    
Redux State:

   state = {
    contactList:{
      contactList: [{id:123, name:'abcd', someMore}],
      metadata: {
        isLoading: false,
        isFailed: false,
        hasUpdated: false
      },
    },
    contactDetails:{
      ids:{
        123:{ all information }
      },
      metadata: {
        isLoading: false,
        isFailed: false
      },
  }
  
  
  Rest cleint :
    superagent-bluebird-promise

  
Enjoy :)
  
  
    
