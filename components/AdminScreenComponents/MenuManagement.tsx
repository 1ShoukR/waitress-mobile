import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Restaurant, MenuItem } from 'types/types';

export const MenuManagement = ({ restaurant }: { restaurant: Restaurant }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[] | undefined>(restaurant.MenuItems);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemImageUrl, setItemImageUrl] = useState('');

  const addItem = () => {
    setCurrentItem(null);
    setItemName('');
    setItemDescription('');
    setItemPrice('');
    setItemCategory('');
    setItemImageUrl('');
    setModalVisible(true);
  };

  const editItem = (item: MenuItem) => {
    setCurrentItem(item);
    setItemName(item.NameOfItem);
    setItemDescription(item.Description);
    setItemPrice(item.Price.toString());
    setItemCategory(item.Category);
    setItemImageUrl(item.ImageURL);
    setModalVisible(true);
  };

  const deleteItem = (menuItemId: number) => {
    setMenuItems(menuItems!.filter(item => item.MenuID !== menuItemId));
  };

  const saveItem = () => {
    const newItem: MenuItem = {
      MenuID: currentItem?.MenuID || Math.max(...menuItems!.map(item => item.MenuID), 0) + 1,
      RestaurantID: restaurant.RestaurantId,
      NameOfItem: itemName,
      Price: parseFloat(itemPrice),
      IsAvailable: true,
      Category: itemCategory,
      ImageURL: itemImageUrl,
      Description: itemDescription,
      Restaurant: restaurant,
    };

    if (currentItem) {
      setMenuItems(menuItems!.map(item => item.MenuID === currentItem.MenuID ? newItem : item));
    } else {
      setMenuItems([...menuItems!, newItem]);
    }

    setModalVisible(false);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.ImageURL }} style={styles.menuItemImage} />
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.NameOfItem}</Text>
        <Text style={styles.menuItemDescription}>{item.Description}</Text>
        <Text style={styles.menuItemPrice}>${item.Price.toFixed(2)}</Text>
        <Text style={styles.menuItemCategory}>{item.Category}</Text>
      </View>
      <View style={styles.menuItemActions}>
        <TouchableOpacity onPress={() => editItem(item)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(item.MenuID)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu Management</Text>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.MenuID.toString()}
        style={styles.menuList}
      />
      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.buttonText}>Add New Item</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.modalTitle}>{currentItem ? 'Edit Item' : 'Add New Item'}</Text>
                <TextInput
                  style={styles.input}
                  value={itemName}
                  onChangeText={setItemName}
                  placeholder="Item Name"
                />
                <TextInput
                  style={styles.input}
                  value={itemDescription}
                  onChangeText={setItemDescription}
                  placeholder="Description"
                  multiline
                />
                <TextInput
                  style={styles.input}
                  value={itemPrice}
                  onChangeText={setItemPrice}
                  placeholder="Price"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  value={itemCategory}
                  onChangeText={setItemCategory}
                  placeholder="Category"
                />
                <TextInput
                  style={styles.input}
                  value={itemImageUrl}
                  onChangeText={setItemImageUrl}
                  placeholder="Image URL"
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.saveButton} onPress={saveItem}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuList: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 4,
  },
  menuItemCategory: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 4,
  },
  menuItemActions: {
    justifyContent: 'space-around',
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 8,
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
});

export default MenuManagement;