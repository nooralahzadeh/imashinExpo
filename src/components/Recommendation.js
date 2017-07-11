import React, { Component } from 'react';

//import MapView from 'react-native-maps';
import Expo from 'expo';
import { Card, Image, View, Subtitle, Text, Caption } from '@shoutem/ui';


class Recommendation extends Component {
    get photo() {
        const photo = this.props.venue.photos.groups[0].items[0];

        return `${photo.prefix}500x700${photo.suffix}`;
    }

    render() {
        const { venue, tips } = this.props;

        return (
            <Expo.MapView.Marker coordinate={{latitude: venue.location.lat,
                                         longitude: venue.location.lng}}>

                <Expo.MapView.Callout>
                    <Card>
                        <Image styleName="medium-avatar"
                               source={{uri: this.photo}} />
                        <View styleName="content">
                            <Subtitle>{venue.name}</Subtitle>
                            <Caption>{tips ? tips[0].text : ''}</Caption>
                        </View>
                    </Card>
                </Expo.MapView.Callout>
            </Expo.MapView.Marker>
        )
    }
}

export default Recommendation;
