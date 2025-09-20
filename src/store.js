export const initialStore = () => {
  return {
    firstName: "Angy",
    lastName: "MD",
    contacts: [],
    baseURL: "https://playground.4geeks.com/contact"
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'setFirstName':
      return {
        ...store,
        fname: action.payload
      }
    case 'setLastName':
      return {
        ...store,
        lname: action.payload
      }
    case 'setContacts':
      return {
        ...store,
        contacts: action.payload
      }
    case 'otroNombre': 
      const { listaContactos } = action.payload
      return {
        ...store,
        contacts: listaContactos
      }

    case 'updateContact':
      const { id, updatedContact } = action.payload
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === id ? { ...contact, ...updatedContact } : contact
        )
      }
    case 'deleteContact':
      const { idToDelete } = action.payload
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== idToDelete)
      }

    default:
      throw Error('Error: acción desconocida');
  }
}
