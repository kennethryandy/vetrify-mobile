import { StyleSheet } from 'react-native'
import { PaperSelect } from 'react-native-paper-select';

const SingleSelect = ({ value, label = "", onSelect, list }) => {
	return (
		<PaperSelect
			label={label}
			value={value?.text}
			onSelection={onSelect}
			arrayList={list}
			selectedArrayList={value?.selectedList || []}
			multiEnable={false}
		/>
	)
}

export default SingleSelect

const styles = StyleSheet.create({})