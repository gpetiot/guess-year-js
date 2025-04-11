import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';

interface ShareButtonsProps {
  shareText: string;
}

export const ShareButtons = ({ shareText }: ShareButtonsProps) => {
  const shareUrl = window.location.origin;
  const buttonSize = 32;
  const buttonStyle = { margin: '0 4px' };

  return (
    <div className="flex items-center justify-center gap-2">
      <TwitterShareButton url={shareUrl} title={shareText} style={buttonStyle}>
        <TwitterIcon size={buttonSize} round />
      </TwitterShareButton>

      <FacebookShareButton url={shareUrl} title={shareText} style={buttonStyle}>
        <FacebookIcon size={buttonSize} round />
      </FacebookShareButton>

      <WhatsappShareButton url={shareUrl} title={shareText} style={buttonStyle}>
        <WhatsappIcon size={buttonSize} round />
      </WhatsappShareButton>

      <TelegramShareButton url={shareUrl} title={shareText} style={buttonStyle}>
        <TelegramIcon size={buttonSize} round />
      </TelegramShareButton>
    </div>
  );
};
