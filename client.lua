local client = {}
client.actualModel = nil
client.maxGears = {}
client.maxFuel = {}

Citizen.CreateThread(function()
    while true do
        local sleep = 1000

        if cache.vehicle and DoesEntityExist(cache.vehicle) then
            sleep = 50

            if client.actualModel then
                if not client.maxGears[client.actualModel] then
                    client.maxGears[client.actualModel] = GetVehicleHandlingFloat(cache.vehicle, 'CHandlingData', "nInitialDriveGears")
                end

                if not client.maxFuel[client.actualModel] then
                    client.maxFuel[client.actualModel] = GetVehicleHandlingFloat(cache.vehicle, 'CHandlingData', "fPetrolTankVolume")
                end
            end

            SendNUIMessage({
                action = 'updateSpeedo',
                data = {
                    gear = GetVehicleCurrentGear(cache.vehicle),
                    maxGear = client.maxGears[client.actualModel],
                    fuel = GetVehicleFuelLevel(cache.vehicle),
                    maxFuel = client.maxFuel[client.actualModel],
                    speed = math.floor(GetEntitySpeed(cache.vehicle) * 2.236936)
                }
            })
        end

        Wait(sleep)
    end
end)

lib.onCache('vehicle', function(vehicle)
    if not vehicle or (vehicle and not DoesEntityExist(vehicle)) then
        client.actualModel = nil

        return SendNUIMessage({
            action = 'hideSpeedo'
        })
    end

    client.actualModel = GetEntityModel(vehicle)
end)