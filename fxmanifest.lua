---@diagnostic disable: undefined-global
fx_version 'cerulean'
game 'gta5'

lua54 'yes'
author 'Snaily'
description 'Speedometer made for Cfx.re Platform'

shared_scripts {
    '@ox_lib/init.lua'
}

client_script 'client.lua'
ui_page 'web/build/index.html'

files {
    'web/build/index.html',
    'web/build/**/*',
}