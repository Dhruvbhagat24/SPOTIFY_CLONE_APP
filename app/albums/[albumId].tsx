import * as React from "react";

import { useLocalSearchParams } from "expo-router";
import { AlbumScreen } from "@screens";

export default function Artist() {
  const local = useLocalSearchParams();

  return <AlbumScreen albumId={local.albumId as string} />;
}
