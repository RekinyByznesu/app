import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface DropdownProps {
  items: any;
  searchable: boolean;
  editable: boolean;
  defaultValue: string;
  placeholder: string;
  open: boolean;
  multiple: any;
  onOpen?: () => void;
  setOpen: (value: any) => void;
  setValue: (value: any) => void;
  setItems: (value: any) => void;
}

export default function Dropdown({
  items,
  searchable,
  editable,
  defaultValue,
  placeholder,
  open,
  multiple,
  onOpen,
  setOpen,
  setValue,
  setItems,
}: DropdownProps) {
  DropDownPicker.setListMode("MODAL                            ");
  return (
    <View>
      <DropDownPicker
        open={open}
        onOpen={onOpen}
        value={defaultValue}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={multiple}
        style={{
          borderRadius: 20,
          borderColor: "#FE7153",
          borderWidth: 1,
          zIndex: 999,
        }}
        dropDownContainerStyle={{
          borderColor: "#FE7153",
          borderWidth: 1,
          borderRadius: 20,
          flexDirection: "column-reverse",
          zIndex: 1000,
        }}
        dropDownDirection="BOTTOM"
        // containerStyle={{
        //   display: "flex",
        //   justifyContent: "center",
        // }}
        placeholder={placeholder}
        searchable={searchable}
        addCustomItem={editable}
        textStyle={{
          alignSelf: "center",
          textAlign: "center",
        }}
        searchContainerStyle={{
          borderBottomColor: "#eee",
        }}
        customItemLabelStyle={{}}
        searchTextInputStyle={{
          borderColor: "#fff",
        }}
        searchPlaceholder="Add a tag"
        showTickIcon={true}
      />
    </View>
  );
}
