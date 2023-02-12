import { API_TOKEN } from '@env';

import {
	StatusBar
} from 'expo-status-bar';
import {
	StyleSheet,
	Alert,
	Button,
	FlatList,
	Image,
	Text,
	TextInput,
	View
} from 'react-native';

import React from 'react';

const G_MEALDB_API_KEY = '1';

export default function App() {
	const [ searchString, setSearch ] = React.useState ( '' );
	const [ results, setResults ] = React.useState ( [ ] );

	const onClick = ( ) => {
		fetch ( `https://www.themealdb.com/api/json/v1/${G_MEALDB_API_KEY}/filter.php?i=${searchString}` )
			.then ( resp => resp.json ( ) )
			.then ( resp => {
				setResults ( resp.meals );
			} )
			.catch ( err => Alert.alert ( 'Error', err ) );
	};

	const keyExtractor = ( item, index ) => index.toString ( );
	const listItemRenderer = ( { item } ) => {
		return <View style={ { padding: 12 } }>
			<Image source={ item.strMealThumb } style={ { width: 120, height: 120 } }/>
			<Text style={ { fontSize: 16, fontWeight: 'bold' } }>{ item.strMeal }</Text>
		</View>;
	};

	return ( <View style = { styles.container }>
			<FlatList keyExtractor={ keyExtractor } renderItem={ listItemRenderer } data={ results }/>
			<TextInput style={ { fontSize: 18, width: 200, borderColor: 'black', borderWidth: 2 } } placeholder='Ingredient' value={ searchString } onChangeText={ text => setSearch ( text ) }/>
			<Button title='Find' onPress={ ( ) => onClick ( ) }/> 
			<StatusBar style = "auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});