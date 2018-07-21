port module GameOfLife exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Debug exposing (log)
import List exposing (repeat, map)
import VirtualDom exposing (Node)


main : Program Never Model Msg
main =
    Html.program
        { init = initModel ! []
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


-- MODEL


type alias Model =
    { active: Bool
    , cellules: List Cellule
    , cellules_width: Int
    , cellules_height: Int
    }

initModel : Model
initModel =
    { active = False
    , cellules = repeat 2000 initCellule
    , cellules_width = 50
    , cellules_height = 40
    }

type alias Cellule =
    { alive: Bool
    , dead: Bool
    }

initCellule : Cellule
initCellule =
    { alive = False
    , dead = True
    }


-- UPDATE


type Msg
    = NoOp
    | Random
    | Start
    | Step
    | Reset
    | Stop
    | ToggleCellule


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            Debug.log "NoOp"
                model ! []

        Random ->
            Debug.log "Random"
                model ! []

        Start ->
            Debug.log "Start"
                model ! []

        Step ->
            Debug.log "Step"
                model ! []

        Reset ->
            Debug.log "Reset"
                model ! []

        Stop ->
            Debug.log "Step"
                model ! []

        ToggleCellule ->
            Debug.log "ToggleCellule"
                model ! []


-- VIEW


view : Model -> Html Msg
view model =
    section
        [ class "game-container" ]
        [ appHeader
        , section
            [ class "game-area" ]
            [ viewGameOfLife
            , viewGameButtons
            ]
        , appFooter
        ]

viewGameOfLife : Html Msg
viewGameOfLife =
    div
        [ class "game-of-life" ]
        ( List.map viewGameCellule initModel.cellules )

viewGameCellule : Cellule -> VirtualDom.Node Msg
viewGameCellule htmlCellule =
    div
        [ class "game-cellule"
        , onClick ToggleCellule ]
        []

viewGameButtons : Html Msg
viewGameButtons =
    div
        [ class "game-buttons" ]
        [ viewGameButton { name = "Random", msg = Random }
        , viewGameButton { name = "Step", msg = Step }
        , viewGameButton { name = "Start", msg = Start }
        , viewGameButton { name = "Stop", msg = Stop }
        , viewGameButton { name = "Reset", msg = Reset }
        ]

viewGameButton : { name: String, msg: Msg } -> Html Msg
viewGameButton { name, msg } =
    button
        [ class "game-button"
        , onClick msg ]
        [ text name ]


appHeader : Html msg
appHeader =
    header 
        [ class "app-header" ]
        [ img
            [ src "favicon.ico"
            , class "app-logo"
            , alt "logo"
            ]
            []
        , h1
            [ class "app-title" ]
            [ text "Game of Life" ]
        ]

appFooter : Html msg
appFooter =
    footer
        [ class "app-footer" ]
        [ strong
            [ class "footer-text" ]
            [ text "Game of Life - an Elm experience "
            , a
                [ href "https://github.com/diegocardoso93/game-of-life"
                , target "_blank" 
                ]
                [ text "source" ]
            ]
        ]