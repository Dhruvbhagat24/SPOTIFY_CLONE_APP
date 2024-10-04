import * as React from 'react';
import { Redirect } from 'expo-router';

export default function Library() {
  return <Redirect href={{ pathname: '/library/saved-playlists' }} />;
}
