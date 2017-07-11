import React, { Component } from 'react';

import Expo from 'expo';
//import MapView from 'react-native-maps'
import { Subtitle, Title } from '@shoutem/ui';
import map from "./Styles/map";
import Recommendation from './Recommendation';

const RecommendationsMap = ({ mapRegion, gpsAccuracy, recommendations, lookingFor,
                              headerLocation, onRegionChange }) => (

    <Expo.MapView.Animated region={mapRegion}
                      style={map.fullscreen}
                      onRegionChange={onRegionChange}>

        <Title styleName="h-center multiline" style={map.mapHeader}>
            {lookingFor ? `${lookingFor} in` : ''} {headerLocation}
        </Title>

        <Expo.MapView.Circle center={mapRegion}
                        radius={gpsAccuracy*1.5}
                        strokeWidth={0.5}
                        strokeColor="rgba(66, 180, 230, 1)"
                        fillColor="rgba(66, 180, 230, 0.2)"
                        />

                      <Expo.MapView.Circle center={mapRegion}
                        radius={5}
                        strokeWidth={0.5}
                        strokeColor="rgba(66, 180, 230, 1)"
                        fillColor="rgba(66, 180, 230, 1)"
                        />

                       {recommendations.map(r => <Recommendation {...r} key={r.venue.id} />)}

    </Expo.MapView.Animated>
);

export default RecommendationsMap;
