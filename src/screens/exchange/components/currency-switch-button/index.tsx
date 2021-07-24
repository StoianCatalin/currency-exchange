import { SwitchButton, StyledIcon } from "./styled";
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

interface IProps {
    onClick: () => void;
}

export default function CurrencySwitchButton({ onClick }: IProps) {

    return (
        <SwitchButton data-testid="switch-button" onClick={() => onClick()}>
            <StyledIcon icon={faExchangeAlt} />
        </SwitchButton>
    );
}
