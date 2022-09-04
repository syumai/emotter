package main

import "github.com/syumai/emo"

func validateIsEmoji(emoji string) bool {
	return emo.GetFromEmojiString(emoji) != nil
}
