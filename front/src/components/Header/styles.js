import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 70px;
    background: #20295F;
    border-bottom: 5px solid #EE6B26;

`;

export const LeftSide = styled.div`
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    
    img {
        width: 100px;
        height: 40px;
    }
`;

export const RigthSide = styled.div`
    width: 50%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a {
        color: #FFF;
        font-weight: bold;
        text-decoration: none;
        margin: 0 10px;

        &:hover {
            color: #EE6B26;
        }

    }

    #notification {
        display: flex;

        img {
            width: 25px;
            height: 30px;

        }
        span {
            background: #FFF;
            color: #EE6B26;
            border-radius: 50%;
            height: 20px;
            width: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            top: 0px;
            left: -10px;
        }
        
        &:hover {
            opacity: 0.5;
        }
    }
    .divider::after {
        content: '|';
        color: #FFF
    }
`;