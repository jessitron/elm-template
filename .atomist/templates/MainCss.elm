module MainCss exposing (..)

import Css exposing (..)
import Css.Elements


css : Stylesheet
css =
    stylesheet
        [ Css.Elements.img
            [ display block
            , margin2 (px 5) auto
            ]
        , Css.Elements.div [ textAlign center ]
        ]
