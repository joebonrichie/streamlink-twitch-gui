import { moveAttributes, qualityIdToName } from "./utils";
import qualities from "models/stream/qualities";


export default function( channelsettings ) {
	moveAttributes( channelsettings, {
		quality: "streaming_quality",
		gui_openchat: "streams_chat_open",
		notify_enabled: "notification_enabled"
	});

	qualityIdToName( channelsettings, qualities, "streaming_quality", false );
}
