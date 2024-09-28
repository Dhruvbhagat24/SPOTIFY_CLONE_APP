import { SEPARATOR } from "@config";
import { translations } from "@data";
import * as React from "react";
import { Text, View } from "react-native";

import { styles } from "./styles";

export type AlbumTotalTracksPropsType = {
  releaseDate: string;
  totalTracks: number;
  totalDuration: number;
};

const getDisplayTime = (totalDuration: number) => {
  if (totalDuration / 1000 < 60) {
    return `${totalDuration / 1000}min`;
  }

  if ((totalDuration / 1000) % 60 === 0) {
    return `${totalDuration / 1000 / 60}h`;
  }

  if (totalDuration / 1000 > 60) {
    return `${Math.floor(totalDuration / 1000 / 60)}h ${Math.ceil(
      (totalDuration / 1000) % 60
    )}min`;
  }
};

const getDisplayDate = (date: string) =>
  new Date(date).toLocaleDateString("default", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

export const AlbumSummary = ({
  releaseDate,
  totalTracks,
  totalDuration,
}: AlbumTotalTracksPropsType) => (
  <View style={styles.container}>
    <Text style={styles.dateText}>{getDisplayDate(releaseDate)}</Text>
    <View style={styles.totalView}>
      <Text
        style={styles.totalTracksText}
      >{`${totalTracks} ${translations.album.tracks}`}</Text>
      <Text style={styles.separator}>{SEPARATOR}</Text>
      <Text style={styles.totalDurationText}>
        {getDisplayTime(totalDuration)}
      </Text>
    </View>
  </View>
);
