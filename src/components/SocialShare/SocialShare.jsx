import React from 'react'
import { FacebookShareButton, FacebookIcon, FacebookShareCount } from 'react-share';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

const SocialShare = ({ shareVideoUrl, quote }) => {
    return (
        <div className="flex gap-8 w-20 mt-1 mx-auto">
            <div className="flex gap-1">
                <div className="shrink-0">
                    <FacebookShareButton url={shareVideoUrl} quote={quote}>
                        <FacebookIcon round={true} size={25} />
                    </FacebookShareButton>
                </div>
                <div
                    className="text-sm leading-[1.7142857] text-slate-600"
                >
                    <FacebookShareCount url={shareVideoUrl}>
                        {shareCount => <span className="text-black">{shareCount}</span>}
                    </FacebookShareCount>
                </div>

                <div className="shrink-0">
                    <TwitterShareButton url={shareVideoUrl} title={quote}>
                        <TwitterIcon round={true} size={25} />
                    </TwitterShareButton>
                </div>

                <div className="shrink-0">
                    <WhatsappShareButton url={shareVideoUrl} title={quote}>
                        <WhatsappIcon round={true} size={25} />
                    </WhatsappShareButton>
                </div>

            </div>
        </div>
    )
}

export default SocialShare