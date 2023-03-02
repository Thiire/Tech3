'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">dashboard documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-2eb7334ff7f98532e0454ed5f1d0faa0"' : 'data-target="#xs-components-links-module-AppModule-2eb7334ff7f98532e0454ed5f1d0faa0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2eb7334ff7f98532e0454ed5f1d0faa0"' :
                                            'id="xs-components-links-module-AppModule-2eb7334ff7f98532e0454ed5f1d0faa0"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AuthorizationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthorizationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BattlenetComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BattlenetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoremComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoremComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MeteoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MeteoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MinecraftComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MinecraftComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MoneyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MoneyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SpotifyComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SpotifyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TimeZoneComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TimeZoneComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TwitchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TwitchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/YoutubeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">YoutubeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Connected.html" data-type="entity-link">Connected</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/playlist.html" data-type="entity-link">playlist</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Post_login.html" data-type="entity-link">Post_login</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Post_signin.html" data-type="entity-link">Post_signin</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/text.html" data-type="entity-link">text</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/user.html" data-type="entity-link">user</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/user-1.html" data-type="entity-link">user</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});