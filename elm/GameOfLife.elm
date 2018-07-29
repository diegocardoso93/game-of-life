port module GameOfLife exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Debug exposing (log)
import List exposing (repeat, map)


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

type alias ID = Int

-- UPDATE


type Msg
    = NoOp
    | Random
    | Start
    | Step
    | Reset
    | Stop
    | ToggleCellule Int


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

        ToggleCellule id ->
            let
                updateCellule celluleId cellule =
                    if celluleId == id then
                        { cellule | alive = True }
                    else
                        cellule
            in
                { model | cellules = List.indexedMap updateCellule model.cellules }
                    ! []


-- VIEW


view : Model -> Html Msg
view model =
    section
        [ class "game-container" ]
        [ appHeader
        , section
            [ class "game-area" ]
            [ viewGameOfLife model
            , viewGameButtons
            ]
        , appFooter
        ]

viewGameOfLife : Model -> Html Msg
viewGameOfLife model =
    div
        [ class "game-of-life" ]
        [
            div []
                ( List.indexedMap viewGameCellule model.cellules )
            ,
            div []
                [ text (toString (model.cellules)) ]
        ]

viewGameCellule : ID -> Cellule -> Html Msg
viewGameCellule id htmlCellule =
    div
        [ classList [
            ("game-cellule", True),
            ("cellule-alive", htmlCellule.alive),
            ("cellule-dead", htmlCellule.dead)
        ]
        , onClick (ToggleCellule id)
        ]
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