$tab = [char]9
$input = "c:\Users\Fabrício\OneDrive\Área de Trabalho\Alaska\import\exemplo.csv"
$output = "c:\Users\Fabrício\OneDrive\Área de Trabalho\Alaska\import\template_operacoes_preenchido.csv"

$header = "Data${tab}Hora${tab}Estratégia${tab}Ativo${tab}Lote${tab}Direção${tab}Resultado Bruto${tab}Custos${tab}Resultado Liquido"
$lines = @($header)

$rows = Get-Content $input -Encoding UTF8 | Select-Object -Skip 1
foreach ($line in $rows) {
    if ([string]::IsNullOrWhiteSpace($line)) { continue }

    $parts = $line -split ',(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)'

    # robo=0, data=1, ativo=2, lado=3, resultado=4, resultado_pct=5, hora=6, estrategia=7, lote=8, resultado_bruto=9, custos=10

    # Data: dd/mm/yyyy (já está nesse formato no CSV)
    $data = $parts[1].Trim().Trim('"')

    # Hora
    $hora = $parts[6].Trim().Trim('"')

    # Estrategia
    $estrategia = $parts[7].Trim().Trim('"')

    # Ativo
    $ativo = $parts[2].Trim().Trim('"')

    # Lote
    $lote = $parts[8].Trim().Trim('"')

    # Direcao: V -> Venda, C -> Compra
    $lado = $parts[3].Trim().Trim('"')
    if ($lado -eq 'V') { $direcao = 'Venda' }
    elseif ($lado -eq 'C') { $direcao = 'Compra' }
    else { $direcao = $lado }

    # Resultado Bruto: strip R$, keep comma decimal
    $rb = $parts[9].Trim().Trim('"')
    $rb = $rb -replace 'R\$', ''
    $rb = $rb.Trim()
    if ([string]::IsNullOrWhiteSpace($rb)) { $rb = '0,00' }

    # Custos
    $custos = $parts[10].Trim().Trim('"')
    if ([string]::IsNullOrWhiteSpace($custos)) { $custos = '0,00' }

    # Resultado Liquido (campo resultado)
    $rl = $parts[4].Trim().Trim('"')
    if ([string]::IsNullOrWhiteSpace($rl)) { $rl = '0,00' }

    $row = "${data}${tab}${hora}${tab}${estrategia}${tab}${ativo}${tab}${lote}${tab}${direcao}${tab}${rb}${tab}${custos}${tab}${rl}"
    $lines += $row
}

$lines | Out-File -FilePath $output -Encoding UTF8
Write-Host "Pronto! $($lines.Count - 1) linhas exportadas para template_operacoes_preenchido.csv"
