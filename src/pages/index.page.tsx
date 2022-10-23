import React from 'react';
import H1 from "../components/bases/h1";
import H2 from "../components/bases/h2";
import H3 from "../components/bases/h3";
import H4 from "../components/bases/h4";
import H5 from "../components/bases/h5";
import Note from "../components/bases/note";
import Icon from "../components/bases/icon";
import Select from "../components/inputs/select/select";
import Input from "../components/inputs/input/input";
import Range from "../components/inputs/range/range";
import Button from "../components/UI/button/button";
import IconButton from "../components/UI/icon-button/icon-button";
import {ICONS} from "../assets/icons";
import Block from "../components/UI/block/block";

const IndexPage = () => {
    return (
        <>
            <H1>Самый большой заголовок</H1>
            <H2>Самый большой заголовок</H2>
            <H3>Самый большой заголовок</H3>
            <H4>Самый большой заголовок</H4>
            <H5>Самый большой заголовок</H5>
            <Note>
                Самая маленькая заметка
            </Note>
            <div>
                <Icon icon={"reload"}/>
                <Icon icon={"house"}/>
            </div>
            <Select options={[{value: 1,label: "Что то"}]}/>
            <Input>Ввод текста</Input>
            <Range/>
            <Button>Кнопка</Button>
            <Button loading={true}>Кнопка</Button>
            <Button disabled={true}>Кнопка</Button>
            <Block padding={15} style={{display: "flex", gap: 20, justifyContent: "space-evenly"}}>
                <IconButton icon={<Icon icon={"house"}/>}/>
                <IconButton icon={<Icon icon={"house"}/>} loading={true}/>
                <IconButton icon={<Icon icon={"house"}/>} disabled={true}/>
            </Block>

        </>
    );
};

export default IndexPage;