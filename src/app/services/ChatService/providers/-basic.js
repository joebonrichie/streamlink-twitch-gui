import ChatProvider from "./-provider";
import whichFallback from "utils/node/fs/whichFallback";
import ParameterCustom from "utils/parameters/ParameterCustom";
import Substitution from "utils/parameters/Substitution";


const { chatUrl } = ChatProvider;


/**
 * @class ChatProviderBasic
 * @implements ChatProvider
 */
export default class ChatProviderBasic extends ChatProvider {
	static get userArgsSubstitutions() {
		const base = "settings.chat.provider.providers.basic.substitutions";

		return [
			new Substitution( "url", "url", `${base}.url` ),
			new Substitution( "channel", "channel", `${base}.channel` ),
			new Substitution( "user", "user", `${base}.user` ),
			new Substitution( "token", "token", `${base}.token` )
		];
	}

	async _getExec( config, userConfig ) {
		// don't use fallbacks if the user has set a custom exec path
		return userConfig[ "exec" ]
			? await whichFallback( userConfig[ "exec" ] )
			: await whichFallback( config[ "exec" ], config[ "fallback" ] );
	}

	// noinspection JSCheckFunctionSignatures
	async _getParameters() {
		return [
			new ParameterCustom( null, "args", ChatProviderBasic.userArgsSubstitutions )
		];
	}

	_getRuntimeContext( twitchChannel, session ) {
		const { name: channel } = twitchChannel;
		const { user_name: user, access_token: token, isLoggedIn } = session;
		const url = chatUrl.replace( "{channel}", channel );

		return Object.assign( { url, channel, user, token, isLoggedIn }, this.context );
	}
}
