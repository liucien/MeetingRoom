import {async} from "core-fe";
import {LoginForm} from "module/user";
import React from "react";
import {connect} from "react-redux";
import {Route, Switch} from "react-router-dom";
import "./home.less";
import NotFound from "./NotFound";

const Home = () => {
    const ProductList = async(() => import(/* webpackChunkName: "product" */ "module/product"), "ProductList");
    const RoomDetail = async(() => import(/* webpackChunkName: "roomDetail" */ "module/roomDetail"), "RoomDetail");

    return (
        <Switch>
            <Route exact path="/" component={ProductList} />
            <Route exact path="/RoomDetail/:id?" component={RoomDetail} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/product/list" component={ProductList} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default connect()(Home);
